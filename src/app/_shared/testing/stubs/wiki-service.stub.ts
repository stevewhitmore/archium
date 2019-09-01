import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class WikiServiceStub {

  getAllPageLinks(): Observable<any> {

    return of();
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


}
