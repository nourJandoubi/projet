import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/admin/';

  constructor(private http: HttpClient) { }

  getVisitorsByDay(day:any): Observable<any> {
    return this.http.get(`${this.baseUrl}day/${day}`);
  }
  getVisitorsByLastWeek():Observable<any>
  {
    return this.http.get(`${this.baseUrl}lastweek`)
  }
  getVisitorsByMonth(year:any,month:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}month/${year}/${month}`)

  }
  getVisitorsByYear(year:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}year/${year}`)

  }
  getTotalVisitors():Observable<any>
  {
    return this.http.get(`${this.baseUrl}total`)
  }

}
