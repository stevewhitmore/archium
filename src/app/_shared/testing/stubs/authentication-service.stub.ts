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
    return false;
  }

  getUserName(): string {
    if (this.isLoggedIn()) {
      return 'some-user';
    }

    return null;
  }

  userLoginEvent() {
    this.logInEventSource.next();
  }

  logOut(): void {
      this.logInEventSource.next();
  }
}
