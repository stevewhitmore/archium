import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService {
  logInEventSource = new Subject<any>();
  logInEvent$ = this.logInEventSource.asObservable();


  constructor(private http: HttpClient,
              private router: Router) {}

  login(username: string, password: string): any {
    return this.http.post<any>(`archium-services/login/api.php`, { username, password })
                .pipe(map(resp => {
                    if (resp && resp.apiKey) {
                        localStorage.setItem('apiKey', resp.apiKey);
                        localStorage.setItem('username', resp.username);
                    }

                    return of(resp);
                }));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('apiKey') !== null;
  }

  getUserName(): string {
    if (this.isLoggedIn()) {
      return localStorage.getItem('username');
    }
    
    return null;
  }

  userLoginEvent() {
    this.logInEventSource.next();
  }

  logOut(): void {
      localStorage.removeItem('apiKey');
      localStorage.removeItem('username');
      this.logInEventSource.next();
  }
}
