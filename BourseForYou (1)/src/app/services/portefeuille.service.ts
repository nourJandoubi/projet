import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortefeuilleService {
  private baseUrl = 'http://localhost:3000/api/portefeuilles/';

  constructor(private http: HttpClient) { }

  ajouterPortefeuille(data:FormData):Observable<any>
  { return this.http.post(`${this.baseUrl}`,data)

  }
  supprimerPortefeuille(id:any):Observable<any>
  {return this.http.delete(`${this.baseUrl}${id}`)}

  modifierPortefeuille(id:any,data:FormData):Observable<any>
  {
    return this.http.put(`${this.baseUrl}${id}`,data)
  }

  getPortefeuilleById(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}${id}`)
  }
  getPortefuilleByInvestor(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}investisseur/${id}`)
  }
  /*getActionById(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}${id}`)
  }*/
  supprimerIndice(id:any,indice:any):Observable<any>
   {
    return this.http.delete(`${this.baseUrl}${id}/${indice}`)
   } 
   ajouterIndice(id:any,indice:FormData):Observable<any>
   {
    console.log('dataa',indice)
    return this.http.put(`${this.baseUrl}indice/${id}`,indice)
   } 
}
