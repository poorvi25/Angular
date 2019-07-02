//view child give access to dom child
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut,expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class ContactComponent implements OnInit {


  //form-model used to host reactive form here
   feedbackForm : FormGroup;
   //data-model variable
   feedback: Feedback;
   contactType = ContactType;
   errMess: string;
   feedbackcopy: Feedback = null;
   spinnerVisibility: boolean = false;
   submitted: boolean;
   //form reset to its intial value
    @ViewChild('fform') feedbackFormDirective;
     
    //js object to contain all kinds of error
    //string containing msg corresponding error will be added here
    formErrors = {
      'firstname':'',
      'lastname':'',
      'telnum':'',
      'email':''
    };
   
    //set of error messages
   validationMessages = {
     'firstname':{
       'required': 'First name is required',
       'minlength': 'First name must be 2 characters long',
       'maxlength': 'First name cannot be more than 25 character'
     },
     'lastname':{
      'required': 'Last name is required',
      'minlength': 'Last name must be 2 characters long',
      'maxlength': 'Last name cannot be more than 25 character'
     },
     'telnum':{
       'required': 'Tel. number is required.',
       'pattern': 'Tel. number must contain only numbers.'
     },
     'email':{
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
     }
   };
   //inject formbuilder to make use
  constructor(private fb: FormBuilder,
    private feedbackservice: FeedbackService) { 

    //method which is invoke within constructor
    this.createForm();
  }

  ngOnInit() {
  }

 //creating reactive form which would inject in feedback form
  createForm(){
   this.feedbackForm = this.fb.group({
     //if we have more then 1 validators enclose them in an array
     firstname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
     lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
     telnum: [0, [Validators.required, Validators.pattern] ],
     email:  ['', [Validators.required, Validators.email] ],
     agree: false,
     contacttype: 'None',
     message: ''

   });

   this.feedbackForm.valueChanges
   .subscribe(data => this.onValueChanged(data));

   this.onValueChanged(); //(re)set form validation messages
  }

  //data? means parameter can or cannot be passed
  onValueChanged(data?: any){
    //if nothing in form
    if(!this.feedbackForm){ return; }
    const form = this.feedbackForm;
    //field take formError object having 4 fields
    for(const field in this.formErrors){
      //checking form fields 
    if(this.formErrors.hasOwnProperty(field)) {
        // clear previous error if any
    this.formErrors[field] = '';
        //access the form field 
    const control = form.get(field);
      //if field is dirty,valid and have control
    if(control && control.dirty && !control.valid){
          //picking messages corresponding to form fields
    const messages = this.validationMessages[field];
          //checking if any error
    for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              //whatever form error msgs attach to that field
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    //form js object.. value use to load the current value
     this.spinnerVisibility = true;
     this.feedback = this.feedbackForm.value;
   this.feedbackcopy = this.feedbackForm.value;
    this.feedbackservice.submitFeedback(this.feedbackcopy)
     .subscribe(feedback => {
     this.feedback = feedback,
     this.feedbackcopy = feedback;
     this.submitted = true;
     // after 5s form becomes not submitted (visible)
   setTimeout(() => {
      this.submitted = false;
      this.spinnerVisibility = false;
      
     }, 5000); 
     },
     errmess => { this.feedback = null; this.errMess = <any>errmess; });
    
  this.feedbackFormDirective.resetForm();
  this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
  });
}
}
