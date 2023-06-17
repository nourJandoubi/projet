import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = 'http://localhost:3000/api/password/';
  currentUser: Observable<any>;
  behaviourSubject: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  constructor(
    private http: HttpClient 
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  resetPassword(token:any,password:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/reset-password/${token}`,password)
    .pipe(
      map((auth: any) => {
    
        if (auth.success) {
         
          localStorage.setItem('TOKEN', auth.token);
          localStorage.setItem('currentUser', JSON.stringify(auth.user));
          this.currentUserSubject = new BehaviorSubject<any>(auth.user);
          return auth;
        } 
      }),
      catchError((err: any) => {
        console.log(err);
        return undefined;
      })
    )
  }
  forgetPassword(data:FormData):Observable<any>
  {
    return this.http.post(`${this.baseUrl}forgot-password`,data)
   
  }
}
