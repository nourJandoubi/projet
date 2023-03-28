import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  currentUser: Observable<any>;
  behaviourSubject: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  authToken: any;

  private baseUrl = 'http://localhost:3000/api/user/';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }
  signup(user: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}register/`, user).pipe(
      map((auth: any) => {
        if (auth.success) {
          localStorage.setItem('TOKEN', auth.token);
          localStorage.setItem('currentUser', JSON.stringify(auth.user));
          this.currentUserSubject = new BehaviorSubject<any>(auth.user);
          0;
          return auth.success;
        } else {
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return undefined;
      })
    );
  }

  signin(user: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.baseUrl}login`, user, { headers: headers })
      .pipe(
        map((auth: any) => {
          if (auth.success) {
            localStorage.setItem('TOKEN', auth.token);
            localStorage.setItem('currentUser', JSON.stringify(auth.user));
            this.currentUserSubject = new BehaviorSubject<any>(auth.user);
            console.log('current subject',this.currentUserSubject);
            0;
            return auth.success;
          } else {
          }
        }),
        catchError((err: any) => {
          console.log(err);
          return undefined;
        })
      );
  }

  logOut() {
    localStorage.clear();
  }
  isLogedIn() {
    return (
      localStorage.getItem('TOKEN') != null &&
      localStorage.getItem('TOKEN') != 'undefined'
    );
  }
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

}
