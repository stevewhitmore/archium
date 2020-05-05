import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { WikiService } from '@services';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html'
})
export class WikiMenuComponent implements OnInit {
  pages$: any;
  selectedPage: any;
  routeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private wikiService: WikiService) {
  }

  ngOnInit() {
    this.loadPages();
  }

  loadPages() {
    this.pages$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedPage = params.get('path');
        return this.wikiService.getAllPages();
      })
    );
  }

}
