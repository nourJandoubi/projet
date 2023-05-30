import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000/api/admin/';
  constructor(private http: HttpClient) { }

  getUsersByDay(day:any): Observable<any> {
    return this.http.get(`${this.baseUrl}day/${day}`);
  }
  getUsersByLastWeek():Observable<any>
  {
    return this.http.get(`${this.baseUrl}lastweek`)
  }
  getUsersByMonth(year:any,month:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}month/${year}/${month}`)

  }
  getUsersByYear(year:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}year/${year}`)
  }
  getTotalUsers():Observable<any>
  {
    return this.http.get(`${this.baseUrl}total`)
  }
  getCountry():Observable<any>
  {
    return this.http.get(`${this.baseUrl}country`)
  }
  getTotalCountries():Observable<any>
  {
    return this.http.get(`${this.baseUrl}totalCountries`, {responseType: 'text'})
  }

  
}
