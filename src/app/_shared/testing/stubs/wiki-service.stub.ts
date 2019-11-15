import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

const mockPageLinks = require('../test-data/all-page-links.json');

@Injectable()
export class WikiServiceStub {
  pageLoadedEventSource = new Subject<any>();
  pageLoadedEvent$ = this.pageLoadedEventSource.asObservable();

  getAllPageLinks(): Observable<any> {
    return of(mockPageLinks);
  }

  getPageContent(path: string): Observable<any> {
    return of();
  }

  savePageChanges(page): Observable<any> {
    return of();
  }

  createPage(pageTitle: string): Observable<any> {
    return of();
  }

  deletePage(pagePath: string): Observable<any> {
    return of();
  }

  indicatePageLoaded() {
    this.pageLoadedEventSource.next();
  }

}
