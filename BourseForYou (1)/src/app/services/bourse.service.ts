import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BourseService {

  private baseUrl = 'http://localhost:3000/api/bourse/';
  
  constructor(private http: HttpClient) { }
  getBourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}bourses`);
  }
  getBourseByName(nomBourse:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${nomBourse}`);
  }
  
}
