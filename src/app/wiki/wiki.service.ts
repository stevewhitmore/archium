import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, of } from 'rxjs';
import { WikiModel } from '../_shared/models';
import {Url} from '../_shared/enums';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../_shared/security/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  pageLoadedEventSource = new Subject<any>();
  pageLoadedEvent$ = this.pageLoadedEventSource.asObservable();
  pages: Observable<WikiModel[]>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  getAllPageLinks() {
    if (!this.pages) {
      this.pages = <Observable<WikiModel[]>>this.http.get(`${Url.WIKI_CONTEXT}`);
    }
    return this.pages;
  }

  getPageContent(path: string): Observable<any> {
    console.log('path:', path);
    if (this.pages) {
      return this.pages
      .pipe(
        // map(pages => pages.map(page => (({title, path}) => ({title, path}))(page)))
        map(pages => pages.find(page => page.path = path))
      );
    } else {
      return of('');
    }
    
  }

  savePageChanges(page): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.getAuthToken()
    });
    const data = JSON.stringify(page);

    return <Observable<any>>this.http
              .put(`${Url.WIKI_CONTEXT}`, data, {headers: headers})
              .pipe(
                catchError(e => throwError(console.log))
              );
  }

  createPage(pageTitle: string): Observable<any> {
    const createdWiki = {
      title: pageTitle
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.getAuthToken()
    });
    const data = JSON.stringify(createdWiki);

    return <Observable<any>>this.http.post(Url.WIKI_CONTEXT, data, {headers: headers});
  }

  deletePage(page): Observable<any> {
    const doomedWiki = {
      pageId: page.pageId,
      delete: true
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.getAuthToken()
    });
    const data = JSON.stringify(doomedWiki);

    return <Observable<any>>this.http.put(Url.WIKI_CONTEXT, data, {headers: headers});
  }

  indicatePageLoaded() {
    this.pageLoadedEventSource.next();
  }

}
