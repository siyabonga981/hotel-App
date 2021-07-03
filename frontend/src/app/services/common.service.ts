import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getUser(){
    return JSON.parse(sessionStorage.getItem('user'));
  }
  constructor() { }
}
