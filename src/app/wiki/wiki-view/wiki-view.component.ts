import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { WikiModel } from 'src/app/_models';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.scss']
})
export class WikiViewComponent implements OnChanges {
  @Input() pageContent: WikiModel;
  currentContent: WikiModel;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageContent.currentValue !== changes.pageContent.previousValue) {
      this.currentContent = changes.pageContent.currentValue;
    }
  }

}
