import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService extends BaseService {

  constructor(private http: HttpClient) {
    super(http);
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${this.apiUrl}/user/authenticate`, { username, password })
                .pipe(map(user => {
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }

                    return user;
                }));
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }

  logout() {
      localStorage.removeItem('currentUser');
  }
}