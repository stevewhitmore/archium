import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService {
  logOutEventSource = new Subject<any>();
  logOutEvent$ = this.logOutEventSource.asObservable();


  constructor(private http: HttpClient,
              private router: Router) {}

  login(username: string, password: string): any {
    const userData = {
      apiKey: 'foobar',
      username: 'moocows'
    }
    localStorage.setItem('apiKey', userData.apiKey);
    localStorage.setItem('username', userData.username);
    return of(userData);
    // return this.http.post<any>(`services/login/api.php`, { username, password })
    //             .pipe(map(resp => {
    //                 if (resp && resp.apiKey) {
    //                     localStorage.setItem('apiKey', resp.apiKey);
    //                 }

    //                 return of(resp);
    //             }));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('apiKey') !== null;
  }

  getUserName(): string {
    if (this.isLoggedIn()) {
      return localStorage.getItem('apiKey');
    }
    
    return null;
  }

  userLoginEvent() {
    this.logOutEventSource.next();
  }

  logOut(): void {
      localStorage.removeItem('apiKey');
      localStorage.removeItem('username');
      this.logOutEventSource.next();
  }
}
