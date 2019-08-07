import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { WikiModel } from 'src/app/_shared/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wiki-edit',
  templateUrl: './wiki-edit.component.html',
  styleUrls: ['./wiki-edit.component.scss']
})
export class WikiEditComponent implements OnChanges {
  @Input() pageContent: WikiModel;
  @Output() toggleEditModeEvent = new EventEmitter();
  @Output() saveEditsEvent = new EventEmitter();
  currentContent: WikiModel;
  wikiTitle = new FormControl('');
  wikiContent = new FormControl('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageContent.currentValue !== changes.pageContent.previousValue) {
      this.currentContent = changes.pageContent.currentValue;
      this.wikiTitle.setValue(this.currentContent.title);
      this.wikiContent.setValue(this.currentContent.content);
    }
  }

  saveEdit() {
    const updatedPage = {
      pageId: this.currentContent.pageId,
      title: this.wikiTitle.value,
      content: this.wikiContent.value,
      path: this.currentContent.path
    }

    this.saveEditsEvent.emit(updatedPage);
  }

  cancelEdit() {
    this.toggleEditModeEvent.emit(null);
  }
}
