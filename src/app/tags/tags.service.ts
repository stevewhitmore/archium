import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Url } from '../_shared/enums';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {
  }

  getTagData(path: string): Observable<any> {
    return this.http.get(`${Url.TAGS_CONTEXT}index.php?path=${path}`);
  }

  getAllTags(): Observable<any> {
    return this.http.get(`${Url.TAGS_CONTEXT}index.php?path=all`);
  }

}
