import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  swopForm = false;
  newUser: any = {
    firstName: '',
    lastName: '',
    gender: null,
    email: '',
    userPass: ''
  };
  existingUser: any = {
    email: '',
    userPass: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  switchForm(): void{
    this.swopForm = !this.swopForm;
  }


}
