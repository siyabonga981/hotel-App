import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  offers = [
    {
      lodge: 'Enoch Lodge',
      location: 'Windmill Park',
      price: 300,
      image: '../../assets/img/hotel1.jpg'
    },{
      lodge: 'Enoch Lodge',
      location: 'Villa Liza',
      price: 280,
      image: '../../assets/img/hotel2.jpg'
    },{
      lodge: 'Enoch Lodge',
      location: 'Katlehong ',
      price: 450,
      image: '../../assets/img/hotel3.jpg'
    },{
      lodge: 'Enoch Lodge',
      location: 'Vosloorus',
      price: 500,
      image: '../../assets/img/hotel4.png'
    },
  ]
  ngOnInit(): void {
  }
  navigateToBook(){
    this.router.navigate(['hotelApp/book']);
  }
}
