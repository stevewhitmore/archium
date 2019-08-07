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

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): any {
    // const resp = {'apiKey': 'kqwjfqlqwjfq2'};
    // localStorage.setItem('apiKey', resp.apiKey);
    // return of(resp);
    return this.http.post<any>(`http://localhost/archium-services/login/api.php`, { username, password })
                .pipe(map(resp => {
                    if (resp && resp.apiKey) {
                        localStorage.setItem('apiKey', resp.apiKey);
                    }

                    return of(resp);
                }));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('apiKey') !== null;
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
