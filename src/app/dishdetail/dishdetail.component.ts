import { Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import{ switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
    dish: Dish;
    //will store id of all the dishes in collection of dishes in menu
    dishIds: string[];
    prev: string;
    next: string;
    constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {

    //gives current dish id
    this.dishservice.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);
    //switchMap on params observable
    //it  will take the param value and pass it to getdish to get id
    //then it subscribe to get dish to get variable
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id']))) //fetch id
      .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)} ); //fetch dish from id
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
}
