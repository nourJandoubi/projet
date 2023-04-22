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
  getActions(nomBourse:string,pageNumber:any): Observable<any> {

    return this.http.get(`${this.baseUrl}/${nomBourse}`);
  }
 
  getActionsParBourse(bourse:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${bourse}`);
  }
  createAction(h:Action): Observable<any> {
    return this.http.post(`${this.baseUrl}`,h);
  }
  updateAction(id: string, action: Action): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`,action);
  }
  deleteAction(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
