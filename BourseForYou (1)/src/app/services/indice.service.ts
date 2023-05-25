import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndiceService {
  private baseUrl = 'http://localhost:3000/api/indice/';
  constructor(private http: HttpClient) { }
  getAllSecteur():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }
}
