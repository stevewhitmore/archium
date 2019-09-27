import { Component, Input, OnInit } from '@angular/core';
import { WikiModel } from 'src/app/_shared/models';
import { WikiService } from '../wiki.service';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.scss']
})
export class WikiViewComponent implements OnInit {
  @Input() pageContent: WikiModel;

  constructor(private wikiService: WikiService) {
  }

  ngOnInit() {
    this.wikiService.indicatePageLoaded();
  }
}
