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
  getActions(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
 
  getActionsParBourse(nomBourse:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${nomBourse}`);
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
  getActionById(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  getActionByEntreprise(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}entreprise/${id}`)
  }
  vendreAction(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/vendre`,data);
  }
  acheterAction(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/acheter`,data);
  }
}
