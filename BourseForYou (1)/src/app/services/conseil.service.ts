import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConseilService {
  private baseUrl = 'http://127.0.0.1:8000/predict';
  
  constructor(private http: HttpClient) { }
  predict(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}`,data);
  }
}
