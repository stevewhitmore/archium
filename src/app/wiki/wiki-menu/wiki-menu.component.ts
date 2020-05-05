import { Component, OnChanges, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class WikiMenuComponent implements OnChanges {
  @Input() pages: any;
  @Output() addFormActivateEvent: EventEmitter<any> = new EventEmitter();
  allPages: any;
  selectedPage: any;

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['pages'] && changes['pages'].currentValue) {
      this.allPages = changes['pages'].currentValue;
    }
  }

  addNewPage() {
    this.addFormActivateEvent.emit()
  }

}
