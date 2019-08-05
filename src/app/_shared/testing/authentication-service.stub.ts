import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable()
export class AuthenticationServiceStub {
  logInEventSource = new Subject<any>();
  logInEvent$ = this.logInEventSource.asObservable();

  login(username: string, password: string): any {
    return of(true);
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
