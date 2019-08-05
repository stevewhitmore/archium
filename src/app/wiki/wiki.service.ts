import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { WikiModel } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient) {
  }

  getAllPageLinks() {
    return <Observable<any>>this.http.get('/services/wiki/index.php?path=all');
  }

  getPageContent(path: string): Observable<WikiModel> {
    return <Observable<WikiModel>>this.http.get(`/services/wiki/index.php?path=${path}`);
  }

}
