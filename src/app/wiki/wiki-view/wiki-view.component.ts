import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.scss']
})
export class WikiViewComponent implements OnChanges, OnInit {
  @Input() selectedPage: any;
  currentPage: any;

  constructor() { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['selectedPage'] && changes['selectedPage'].currentValue) {
      this.currentPage = changes['selectedPage'].currentValue;
    }
  }

  ngOnInit() {
    if (!this.currentPage) {
      this.currentPage = {
        title: 'Archium [ar\'kiyum]',
        content: `<h3>"the archives"</h3>
                  <p>A simple application for recording the things that matter.</p>`
      }
    }
  }

}
