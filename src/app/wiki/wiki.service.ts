import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  pageLoadedEventSource = new Subject<any>();
  pageLoadedEvent$ = this.pageLoadedEventSource.asObservable();
  pages: Observable<any[]>;
  apiUrl = 'https://localhost:3000/wiki/'

  constructor(private http: HttpClient) {
  }

  getAllPages() {
    if (!this.pages) {
      this.pages = <Observable<any[]>>this.http.get(`${this.apiUrl}`);
    }
    return this.pages;
  }

}
