import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wiki-delete',
  templateUrl: './wiki-delete.component.html',
  styleUrls: ['./wiki-delete.component.scss']
})
export class WikiDeleteComponent {
  @Input() pageContent: any;
  @Output() deletePageEvent = new EventEmitter();
  doomedPath: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageContent.currentValue !== changes.pageContent.previousValue) {
      this.pageContent = changes.pageContent.currentValue;
    }
  }

  confirmDeletion() {
    this.deletePageEvent.emit(this.pageContent);
  }

  toggleDeleteOff() {
    this.deletePageEvent.emit(null);
  }

}
