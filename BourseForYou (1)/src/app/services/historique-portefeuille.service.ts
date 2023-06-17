import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoriquePortefeuilleService {
  private baseUrl = 'http://localhost:3000/api/historique/';

  constructor(private http: HttpClient) { }

  getActionsPortfeuilles(id:any):Observable<any>
  { 
    return this.http.get(`${this.baseUrl}/actionsPortefeuille/${id}`);
  }
  getActionsAchetees(id:any):Observable<any>
  { 
    return this.http.get(`${this.baseUrl}/actionsAchtees/${id}`);
  }
  getActionsVendues(id:any):Observable<any>
  { 
    return this.http.get(`${this.baseUrl}/actionsVendues/${id}`);
  }
  /*supprimerHistorique(id:any):Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }*/

  calculerGainPerte(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/gainPerte`,data);
  }
 
  pourcentageAction(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/pourcentageParAction`,data);
  }
  /*poucentageLiquidites(data:FormData):Observable<any>
  { console.log('service data',data)
    return this.http.post(`${this.baseUrl}/pourcentageLiquidite`,data);
  }*/
  

}
