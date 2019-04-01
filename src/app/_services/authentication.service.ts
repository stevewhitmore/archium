import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';

import {Url} from '../_enums/url.enum';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService extends BaseService {

  constructor(private http: HttpClient) {
    super(http);
  }

  login(username: string, password: string): any {
      return this.http.post<any>(`${Url.API_CONTEXT}user/authenticate`, { username, password })
                .pipe(map(user => {
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }

                    return user;
                }));
  }

  isLoggedIn(): boolean {
      return true;
    // return localStorage.getItem('currentUser') !== null;
  }

  logout(): void {
      localStorage.removeItem('currentUser');
  }
}
