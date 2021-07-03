import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  sidenavItems: any[] = [
    {icon: 'home', name: 'Home', class: 'primaryColour', route: 'home'},
    {icon: 'account_circle', name: 'Profile', class: 'primaryColour', route: 'profile'},
    {icon: 'event_note', name: 'My Bookings', class: 'primaryColour', route: 'bookings'},
    {icon: 'list', name: 'Wishlist', class: 'primaryColour', route: 'wishlist'},
    {icon: 'star', name: 'Reviews', class: 'primaryColour', route: 'reviews'},
    {icon: 'power_settings_new', name: 'Logout', class: 'primaryColour', route: ''}
  ]

  menuItems: any[] = [
    {icon: 'account_circle', name: 'Profile'},
    {icon: 'notifications', name: 'Notifications'},
    {icon: 'event_note', name: 'Bookings'},
    {icon: 'power_settings_new', name: 'Logout'}
  ];

  footerItems: any[] = [
    {icon: 'event_note', name: 'Book'},
    {icon: 'info', name: 'About'},
    {icon: 'collections', name: 'Gallery'},
    {icon: 'alternate_email', name: 'Contact'}
  ];
  user: any = {};

  @ViewChild('sidenav') sidenav;
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

  redirect(page, sidenav){
    sidenav.close()
    if(page == 'Logout'){
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }
}
