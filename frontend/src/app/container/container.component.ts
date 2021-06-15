import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
