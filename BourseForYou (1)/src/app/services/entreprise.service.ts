import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  
  private baseUrl = 'http://localhost:3000/api/entreprise/';
  constructor(private http: HttpClient) { }

  getoneEntreprise(nom:string): Observable<any> {
    return this.http.get(`${this.baseUrl}${nom}`);
  }
  getoneEntrepriseById(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}nomEntreprise/${id}`);
  }
  getAllSecteur():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/secteurs/liste`);
  }
  getActionByBourseAndSecteur(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/Bourse/Secteur`,data)
  }
}
