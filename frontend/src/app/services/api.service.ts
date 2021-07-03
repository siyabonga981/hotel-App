import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  backendUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getClients(key): Observable<any[]> {
    const url = `${this.backendUrl}/${key}`;
    return this.http.get<any[]> (url);
  }

  addClient(key, payload): Observable<any>{
    const url = `${this.backendUrl}/${key}`;
    return this.http.post<any>(url, payload);
  }

  addBooking(key, payload): Observable<any>{
    const url = `${this.backendUrl}/${key}`;
    return this.http.post<any>(url, payload);
  }

  getBookings(key, query?): Observable<any>{
    const url = `${this.backendUrl}/${key}?email=${query}`;
    return this.http.get<any>(url);
  }
}
