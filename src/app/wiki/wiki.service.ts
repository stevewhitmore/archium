import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { WikiModel } from '../_shared/models';
// import { Url } from '@enums';
import {Url} from '../_shared/enums';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient) {
  }

  getAllPageLinks() {
    return <Observable<any>>this.http.get(`${Url.WIKI_CONTEXT}index.php?path=all`);
  }

  getPageContent(path: string): Observable<WikiModel> {
    return <Observable<WikiModel>>this.http.get(`${Url.WIKI_CONTEXT}index.php?path=${path}`);
  }

  savePageChanges(page): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
    });
    const data = JSON.stringify(doomedWiki);

    return <Observable<any>>this.http.put(Url.WIKI_CONTEXT, data, {headers: headers});
  }


}
