import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import{ switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { Comment} from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
    dish: Dish;
    errMess: string;
    //will store id of all the dishes in collection of dishes in menu
    dishIds: string[];
    prev: string;
    next: string;
    constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }
    
     //form-model used to host reactive form here
     commentForm : FormGroup;
     //data-model variable
     comment: Comment;
     //hold copy of modified dish
     dishcopy: Dish;
    //form reset to its intial value
    @ViewChild('cform') commentFormDirective;
    formErrors = {
      'author':'',
      'comment':''
    };
    validationMessages = {
      'author':{
        'required': 'author name is required',
        'minlength': 'Author name must be 2 characters long',
        'maxlength': 'Author name cannot be more than 25 character'
      },
      'comment':{
       'required': 'comment is required'
      }
    };

  
  ngOnInit() {

    //gives current dish id
    this.dishservice.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);
    //switchMap on params observable
    //it  will take the param value and pass it to getdish to get id
    //then it subscribe to get dish to get variable
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id']))) //fetch id
      .subscribe(dish => {this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id)},
       errmess => this.errMess = <any>errmess ); //fetch dish from id
  }
  //to navigate other we need to know its previous id, dishid is current dish
  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);

    //wrap by % operator used here so if dish is 1st then we have in prev last item
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

   goBack(): void{
     this.location.back();

   }

   //creating reactive form which would inject in feedback form
  createForm(){
    this.commentForm = this.fb.group({
      //if we have more then 1 validators enclose them in an array
     
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5
  
});
this.commentForm.valueChanges
.subscribe(data => this.onValueChanged(data));

this.onValueChanged();
}
onValueChanged(data?: any){
  if(!this.commentForm){ return; }
  const form = this.commentForm;
  for(const field in this.formErrors){
  if(this.formErrors.hasOwnProperty(field)) {

  this.formErrors[field] = '';
 
  const control = form.get(field);
   
  if(control && control.dirty && !control.valid){
     
  const messages = this.validationMessages[field];
 
  for(const key in control.errors){
          if(control.errors.hasOwnProperty(key)){
         
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}

onSubmit() {
  this.comment=this.commentForm.value;
  this.comment.date = new Date().toISOString();
  this.dishcopy.comments.push(this.comment);
  //sending updated dishcopy
  this.dishservice.putDish(this.dishcopy)
  //when server replies
  .subscribe(dish => {
   this.dish = dish; this.dishcopy = dish;
  },
  errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess});
  console.log(this.comment);
  this.comment=null;

  //reset form after submit
  this.commentForm.reset({
    author: '',
    comment: '',
    rating: 5

  });
  this.commentFormDirective.resetForm();
}

}