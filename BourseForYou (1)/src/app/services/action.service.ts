import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private baseUrl = 'http://localhost:3000/api/action/';
  
  constructor(private http: HttpClient) { }
  getActualites(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getoneActualite(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createActualite(h:Action): Observable<any> {
    return this.http.post(`${this.baseUrl}`,h);
  }
  updateActualite(id: string, action: Action): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`,action);
  }
  deleteActualite(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
