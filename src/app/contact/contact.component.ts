import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  //form-model used to host reactive form here
   feedbackForm : FormGroup;
   //data-model variable
   feedback: Feedback;
   contactType = ContactType;

   //inject formbuilder to make use
  constructor(private fb: FormBuilder) { 

    //method which is invoke within constructor
    this.createForm();
  }

  ngOnInit() {
  }

 //creating reactive form which would inject in feedback form
  createForm(){
   this.feedbackForm = this.fb.group({
     firstname:'',
     lastname: '',
     telnum: 0,
     email: '',
     agree: false,
     contacttype: 'None',
     message: ''

   });
  }

  onSubmit() {
    //form js object.. value use to load the current value
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);


    //reset form after submit
    this.feedbackForm.reset();
  }
}
