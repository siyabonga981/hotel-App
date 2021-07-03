import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  date: Date = new Date();
  newBooking: any = {
    checkInDate: null,
    checkOutDate: null,
    checkInTime: null,
    checkOutTime: null,
    people: null,
    room: null,
    status: 'Reserved'
  };

  rooms: any = [
    {number: 1, location: 'Outside', status: 'Unavailable'},
    {number: 2, location: 'Inside', status: 'Available'},
    {number: 3, location: 'Outside', status: 'Available'},
    {number: 4, location: 'Inside', status: 'Unavailable'},
    {number: 5, location: 'Outside', status: 'Unavailable'},
  ]
  @ViewChild('book') bookForm: any = {};
  user: any = {};
  constructor(private api: ApiService, private snackbar: MatSnackBar, private common: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    if(!this.common.getUser()){
      this.router.navigate(['login']);
      this.snackbar.open('You need to be logged to access this page', 'Close', {
        duration: 4000
      });
    } else{
      this.user = this.common.getUser();
    }
  }
  
  submitBooking(){
    if(this.bookForm.invalid){
      return false;
    }
    this.newBooking['email'] = this.user['email'];
    this.api.addBooking('bookings/addBooking', this.newBooking).subscribe(res => {
      console.log(res);
      this.snackbar.open('Booking placed successfully', 'Close', {
        duration: 2500
      });
    this.getBookings();
    }, err => {
      console.log(err);
      this.snackbar.open(`Error making booking, try again`, 'Close', {
        duration: 2500
      });
    });
  }
  getBookings(){
    let query = this.user['email'];
    console.log(query);
    
    this.api.getBookings('bookings/getBookings', query).subscribe(res => {
      console.log(res);
    })
  }
}