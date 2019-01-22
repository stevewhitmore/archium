import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class MenuServiceStub {
  fetchedPaths = null;

  toggleMenuComponent = new Subject<any>();
  toggleMenuComponentReceived$ = this.toggleMenuComponent.asObservable();

  pagePathsSource = new Subject<string>();
  pagePaths$ = this.pagePathsSource.asObservable();

  wikiPagePaths = [ "foo1", "foo2", "foo3" ];

  constructor() {
  }

  toggleMenu() {
    this.toggleMenuComponent.next(null);
  }

  getPagePaths(): Observable<any> {
    return of(this.wikiPagePaths);
  }

  updatePagePath(path: string) {
  }


}
