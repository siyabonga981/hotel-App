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
    fullName: '',
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
  formName: string = 'Login';
  modifiedPhone: string = '';
  phoneFails: boolean = false;
  hide : boolean = true;

  constructor(private api: ApiService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  switchForm(): void {
    this.swopForm = !this.swopForm;
    this.formName = 'Register';
  }

  loginClient(): any {
    this.spinner = true;
    console.log(this.existingUser);
    console.log(this.login);
    
    if (this.login.invalid) {
      return false;
    } 
    for (let client of this.clients) {
      console.log(client)
      if (
      this.existingUser['email'].toLowerCase() == client['email'].toLowerCase() && this.existingUser['userPass'] == client['userPass']
      ){
        this.found = true;
        this.spinner = false;
        delete client['_id'];
        delete client['userPass'];
        sessionStorage.setItem('user', JSON.stringify(client));
        this.router.navigate(['./hotelApp/dashboard']);
        break;
      } 
    }
    if(!this.found){
        this.spinner = false;
        this.snackbar.open(
          'Invalid login credentials', 'Close',
          { duration: 3000 }
        );
        return false;
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
    console.log(this.register);
    
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
        this.newUser['status'] = 'Active';
        this.newUser['profilePicture'] = '';
        this.api.addClient('clients/addNewClient', this.newUser).subscribe(res => {
          console.log(res);
        });
        this.getClients();
        this.swopForm = true;
      }
    }
  }
  checkIfLetter(v){

  }
  validatePhone(a){
    console.log(a);
    if(a.length == 3){
      a = a + ' ';
 this.modifiedPhone = a;
    }
    this.modifiedPhone = a;

      let regex = /^\+27\s[0-9]+$/i;
    if(a.length == 13 && regex.test(this.modifiedPhone)){
        console.log('Phone passed all validations');
      }else{
        this.phoneFails = true;
      }
    }
  }
