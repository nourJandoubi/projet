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
  status:string='investor';

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
          localStorage.setItem('status', 'investor');

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
    localStorage.clear();

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.baseUrl}login`, user, { headers: headers })
      .pipe(
        map((auth: any) => {
          if (auth.success) {
            if(auth.status=='admin')
            {
              localStorage.setItem('status', auth.status);
              this.status=auth.status;
            }
            localStorage.setItem('TOKEN', auth.token);
            localStorage.setItem('currentUser', JSON.stringify(auth.user));
            this.currentUserSubject = new BehaviorSubject<any>(auth.user);
            // console.log('current subject',this.currentUserSubject);
            
            return auth;
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
//update information of current User
  updateUser(user: FormData): Observable<any> {
    console.log('user update service',user)
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('TOKEN'),
    });
    const requestOptions = { headers: headers };
    return this.http.put(`${this.baseUrl}update/`, user, requestOptions).pipe(
      map((auth: any) => {
        if (auth.success) {
          console.log('updateUser jithaaa')
          localStorage.setItem('TOKEN', auth.token);
          localStorage.setItem('currentUser', JSON.stringify(user));      
          this.currentUserSubject = new BehaviorSubject<any>(auth.user);
          0;
          return auth.success;
        } else {
          console.log('9a3de nji hneee')
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return undefined;
      })
    );
  }

//user1 fiha el mot de passe jdid
//user2 fiha el mot de passe el 9dim
  updatePassword(user1: any,user2:any): Observable<any> {
 
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.baseUrl}login`, user2, { headers: headers })
      .pipe(
        map((auth: any) => {
         
          if (auth.success) {
            //hedhy mouch 9a3ed ye5dem fiha 
           //this.updateUser(user1)
           console.log('paasword correct, password updated hedhy jeha')
            return auth.success;
          }
           else {
            console.log('Le mot de passe actuel est incorrecte');
            return false;
          }
        }),
        catchError((err: any) => {
          console.log(err);
          return undefined;
        })
      );
  }


verifierEmail(email:FormData):Observable<any>
{
  return this.http.post(`${this.baseUrl}/verifierEmail`,email)
}



//cette partie est pour verifier le compte email
  sendMail(login: string): Observable<any> {
    return this.http.get(`${this.baseUrl}mail/${login}`);
  }

  sendCode(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}request`, user);
  }
  VerifyCode(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}code`, user);
  }
  sendNotification(login: string): Observable<any> {
    return this.http.get(`${this.baseUrl}notification/${login}`);
  }

}
