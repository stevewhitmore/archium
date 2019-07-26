import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient) {
  }

  getAllPageLinks() {
    const tempPageNames = [
      { path: '/foo', title: 'Foo' },
      { path: '/bar', title: 'Bar' },
      { path: '/baz', title: 'Baz' },
      { path: '/bunnies', title: 'Bunnies' }
    ]

    return of(tempPageNames);
  }

}
