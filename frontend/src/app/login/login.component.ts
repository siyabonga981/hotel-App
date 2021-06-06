import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('register') register: any;
  @ViewChild('login') login: any;
  swopForm = false;
  spinner = false;
  newUser: any = {
    firstName: '',
    lastName: '',
    phone: null,
    email: '',
    userPass: '',
  };

  existingUser: any = {
    email: '',
    userPass: '',
  };
  clients: any[] = [];
  found = false;

  constructor(private api: ApiService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  switchForm(): void {
    this.swopForm = !this.swopForm;
  }

  loginClient(): any {
    this.spinner = true;
    console.log(this.existingUser);
    
    if (this.login.invalid) {
      return false;
    } 
    for (let client of this.clients) {
      if (
      this.existingUser['email'].toLowerCase() == client['email'].toLowerCase() && this.existingUser['userPass'] == client['userPass']
      ){
        this.found = true;
        this.spinner = false;
        this.router.navigate(['./hotelApp/dashboard']);
        break;
      } else{
        this.spinner = false;
        this.snackbar.open(
          'Invalid login credentials', 'Close',
          { duration: 3000 }
        );
        return false;
      }
    }
  }

  getClients(): any {
    this.api.getClients('clients/getClients').subscribe(
      (res) => {
        console.log(res);
        this.clients = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  registerNewClient(): any {
    if (this.register.invalid) {
      return false;
    } else {
      for (let client of this.clients) {
        if (
          this.newUser['email'].toLowerCase() == client['email'].toLowerCase()
        ) {
          this.found = true;
          this.snackbar.open(
            'Client with that email already exists, please login.',
            'Close',
            { duration: 3000 }
          );
          break;
        } 
      }
      if (!this.found) {
        console.log('will work');
        this.api.addClient('clients/addNewClient', this.newUser).subscribe(res => {
          console.log(res);
        });
      }
    }
  }
}
