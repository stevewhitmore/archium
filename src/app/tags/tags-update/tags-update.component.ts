import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tags-update',
  templateUrl: './tags-update.component.html',
  styleUrls: ['../tags.component.scss']
})
export class TagsUpdateComponent {
  @Input() pageTags: any[];
  @Input() allTags: any[];
  @Output() updateTagsEvent: EventEmitter<any> = new EventEmitter();
  tagsList: FormControl = new FormControl();

  updateTags() {
    this.updateTagsEvent.emit(this.tagsList.value);
  }

  cancelUpdate() {
    this.updateTagsEvent.emit(null);
  }

}
