import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WikiService } from '@services';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class WikiMenuComponent implements OnInit {
  @Output() menuEvent: EventEmitter<any> = new EventEmitter();
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

  addNewPage() {
    this.menuEvent.emit({addPage: true})
  }

}
