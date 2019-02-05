import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { WikiModel } from '../wiki/wiki.model';
import { BaseService } from './base.service';

import {Url} from '../_enums/url.enum';

@Injectable({
  providedIn: 'root'
})
export class WikiService extends BaseService {
  
  constructor(private http: HttpClient) {
    super(http);
  }

  getPageData(passedInPath): Observable<WikiModel> {  
    return <Observable<WikiModel>>this.http.get(Url.PAGE_CONTEXT + passedInPath);
  }

  updatePageContent(wikiPage): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return <Observable<any>>this.http.put<WikiModel>(Url.API_CONTEXT, wikiPage, {observe: 'response'})
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

    return <Observable<any>>this.http.post<WikiModel>(Url.API_CONTEXT, createdWiki, {observe: 'response'})
              .pipe(catchError(super.handleError));
  }

    deleteWikiPage(wikiPage: string): Observable<any> {
        console.log("wikiPage: ", wikiPage);
        return <Observable<any>>this.http.delete(Url.PAGE_CONTEXT + wikiPage, {observe: 'response'})
              .pipe(catchError(super.handleError));
    }
}
