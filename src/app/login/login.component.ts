import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declaring user with properties
  user = {username: '', password: '', remember: false};

  //ref handle the form after submission
  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit(){
    //log user detail on console
    console.log('User:',this.user);

    //close the dialog box immediately after
    this.dialogRef.close();
  }
}
