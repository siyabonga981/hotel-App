import { Component, OnInit, ViewChild } from '@angular/core';

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
    checkinTime: null,
    checkOutTime: null,
    people: null,
    room: null
  };

  rooms: any = [
    {number: 1, location: 'Outside', status: 'Unavailable'},
    {number: 2, location: 'Inside', status: 'Availabe'},
    {number: 3, location: 'Outside', status: 'Availabe'},
    {number: 4, location: 'Inside', status: 'Unavailable'},
    {number: 5, location: 'Outside', status: 'Unavailable'},
  ]
  @ViewChild('book') bookForm: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  submitBooking(form){
    console.log(form);
    console.log(this.bookForm);
  }
}
