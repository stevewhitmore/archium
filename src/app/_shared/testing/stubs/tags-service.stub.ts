import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TagsServiceStub {

  getTagData(pageId: string): Observable<any> {
    return of();
  }

  getAllTags(): Observable<any> {
    return of();
  }

  updateTags(tagData): Observable<any> {
    return of();
  }

}
