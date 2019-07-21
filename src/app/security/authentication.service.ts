import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): any {
      return this.http.post<any>(`services/login/api.php`, { username, password })
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

  logout(): void {
      localStorage.removeItem('apiKey');
  }
}
