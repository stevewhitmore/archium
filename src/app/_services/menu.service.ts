import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService{
  fetchedPaths = null;

  toggleMenuComponent = new Subject<any>();
  toggleMenuComponentReceived$ = this.toggleMenuComponent.asObservable();

  pagePathsSource = new Subject<string>();
  pagePaths$ = this.pagePathsSource.asObservable();

  constructor(private http: HttpClient) {
    super(http);
  }

  toggleMenu() {
    this.toggleMenuComponent.next(null);
  }

  getPagePaths(): Observable<any> {
    if (!this.fetchedPaths) {
      this.fetchedPaths = this.http.get(Url.API_CONTEXT + '/allpaths');
    }

    return this.fetchedPaths;
  }

  updatePagePath(path: string) {
    this.pagePathsSource.next(path);
  }


}
