import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  user: any = {};
  constructor(private api: ApiService, private common: CommonService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if(!this.common.getUser()){
      this.router.navigate(['login']);
      this.snackbar.open('You need to be logged to access this page', 'Close', {
        duration: 4000
      });
    } else{
      this.user = this.common.getUser();
    }
    this.getBookings();
  }

  getBookings(){
    let query = this.user['email'];
    console.log(query);
    
    this.api.getBookings('bookings/getBookings', query).subscribe(res => {
      console.log(res);
    })
  }
}
