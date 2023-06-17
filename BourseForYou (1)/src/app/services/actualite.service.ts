import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actualite } from '../models/actualite';
@Injectable({
  providedIn: 'root'
})
export class ActualiteService {


  private baseUrl = 'http://localhost:3000/api/actualite/';
  
  constructor(private http: HttpClient) { }
  getActualites(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getoneActualite(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createActualite(h:Actualite): Observable<any> {
    return this.http.post(`${this.baseUrl}`,h);
  }
  updateActualite(id: string, actualite: Actualite): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`,actualite);
  }
  deleteActualite(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  postScrapedData(url: string): Observable<any> {
    const body = { url: url }; // include url in request body
    return this.http.post(`${this.baseUrl}scraping`, body); // send request with body
  }
  
}
