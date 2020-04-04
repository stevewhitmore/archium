import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { WikiService } from './wiki.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit, OnDestroy {
  pages: any;

  constructor(private wikiService: WikiService) {
  }

  ngOnInit() {
    this.wikiService.getAllPages()
      .pipe(take(1))
      .subscribe(pages => {
        this.pages = pages
        console.log('this.pages', this.pages)
      });
    // this.routeSub = this.route.params.subscribe(params => {
    //   if (params) {
    //     this.path = params['page'];
    //     if (this.path) {
    //       this.getPageContent(this.path);
    //       this.isHome = false;
    //     }
    //   }
    // });
  }

  ngOnDestroy() {
    // if (this.routeSub) { this.routeSub.unsubscribe(); }
  }

}
