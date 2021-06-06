import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  backendUrl: string = environment.ssdUrl;
  constructor(private http: HttpClient) { }

  getClients(key): Observable<any[]> {
    const url = `${this.backendUrl}/${key}`;
    return this.http.get<any[]> (url);
  }

  addClient(key, payload): Observable<any>{
    const url = `${this.backendUrl}/${key}`;
    return this.http.post<any>(url, payload);
  }

}
