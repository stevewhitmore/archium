import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logInEventSource = new Subject<any>();
  logInEvent$ = this.logInEventSource.asObservable();
  loggedIn = false

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): any {
    return this.http.post<any>(`http://localhost/api/login/index.php`, { username, password })
                .pipe(map(resp => {
                    if (resp && resp.apiKey) {
                        localStorage.setItem('apiKey', resp.apiKey);
                        this.loggedIn = true;
                    }

                    return of(resp);
                }));
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
    // return true;
  }

  userLoginEvent() {
    this.logInEventSource.next();

  }

  getAuthToken() {
    return localStorage.getItem('apiKey');
  }

  logOut(): void {
      localStorage.removeItem('apiKey');
      this.loggedIn = false;
      this.logInEventSource.next();
  }
}
