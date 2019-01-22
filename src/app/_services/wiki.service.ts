import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { WikiModel } from '../wiki/wiki.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class WikiService extends BaseService {
  
  constructor(private http: HttpClient) {
    super(http);
    this.apiUrl = this.apiUrl + '/pages/';
  }

  getPageData(passedInPath): Observable<WikiModel> {  
    return <Observable<WikiModel>>this.http.get(this.apiUrl + passedInPath);
  }

  updatePageContent(wikiPage): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = this.apiUrl + wikiPage.path;
    return <Observable<any>>this.http.put<WikiModel>(url, wikiPage, {observe: 'response'})
              .pipe(catchError(super.handleError));
    
  }

  createPage(routeNameInput: string): Observable<any> {
    const createdWiki: WikiModel = {
      path: routeNameInput,
      pageContent: '',
      dateCreated: new Date(),
      dateUpdated: new Date()
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.apiUrl + routeNameInput;

    return <Observable<any>>this.http.post<WikiModel>(url, createdWiki, {observe: 'response'})
              .pipe(catchError(super.handleError));
  }

}
