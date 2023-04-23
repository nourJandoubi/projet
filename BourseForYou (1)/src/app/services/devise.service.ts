import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Devise } from '../models/devise';

@Injectable({
  providedIn: 'root'
})
export class DeviseService {

  private baseUrl = 'http://localhost:3000/api/devise/';
  
  constructor(private http: HttpClient) { }
  getDevises(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getDevisesParDate(): Observable<any> {
    return this.http.get(`${this.baseUrl}D`);
  }
  getoneDevise(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createDevise(h:Devise): Observable<any> {
    return this.http.post(`${this.baseUrl}`,h);
  }
  updateDevise(id: string, Devise: Devise): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`,Devise);
  }
  deleteDevise(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
