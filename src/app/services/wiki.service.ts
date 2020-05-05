import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const BASE_URL = 'http://localhost:3000/wiki'

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private _pages$: Observable<any[]>;

  constructor(private http: HttpClient) {
  }

  getAllPages() {
    if (!this._pages$) {
      this._pages$ = <Observable<any[]>>this.http.get(`${BASE_URL}`)
      .pipe(
        publishReplay(1),
        refCount()
      )
    }
    return this._pages$;
  }

  getPage(path: string) {
    return this.getAllPages()
      .pipe(
        map(pages => pages.find(page => page.path === path))
      );
  }

  update(page) {
    return this.http.patch(`${BASE_URL}/${page.id}`, JSON.stringify(page), HEADER );
  }

  addPage(page) {
    const addedPage = {
      id: uuidv4(),
      ...page
    };

    return this.http.post(`${BASE_URL}`, JSON.stringify(addedPage), HEADER );
  }

  refreshPages() {
    this._pages$ = null;
  }
}
