import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const BASE_URL = 'http://localhost:3000/wiki'

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  pages$: Observable<any[]>;

  constructor(private http: HttpClient) {
  }

  getAllPages() {
    if (!this.pages$) {
      this.pages$ = <Observable<any[]>>this.http.get(`${BASE_URL}`)
      .pipe(
        publishReplay(1),
        refCount()
      )
    }
    return this.pages$;
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

}
