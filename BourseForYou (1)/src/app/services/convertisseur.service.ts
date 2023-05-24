import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertisseurService {

  constructor(
    private http: HttpClient
  ) { }
  private baseUrl = 'http://localhost:3000/api/convert/';

  getCurrencies():Observable<any>
  {
   return this.http.get(`${this.baseUrl}`);
  }
  convert(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`,data);
  }

}
