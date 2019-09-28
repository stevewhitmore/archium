import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Url } from '../_shared/enums';
import { AuthenticationService } from '../_shared/security/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  getTagData(pageId: string): Observable<any> {
    return this.http.get(`${Url.TAGS_CONTEXT}index.php?pageId=${pageId}`);
  }

  getAllTags(): Observable<any> {
    return this.http.get(`${Url.TAGS_CONTEXT}index.php?pageId=all`);
  }

  updateTags(tagData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.getAuthToken()
    });
    const data = JSON.stringify(tagData);

    return <Observable<any>>this.http
              .put(`${Url.TAGS_CONTEXT}`, data, {headers: headers})
              .pipe(
                catchError(e => throwError(console.log))
              );
  }

}
