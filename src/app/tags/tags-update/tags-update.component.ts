import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../_shared/custom-error-stat-matcher.component';
import { NotificationService } from 'src/app/_shared/notification.service';

@Component({
  selector: 'app-tags-update',
  templateUrl: './tags-update.component.html',
  styleUrls: ['./tags-update.component.scss']
})
export class TagsUpdateComponent implements OnChanges {
  @Input() pageTags: any[];
  @Input() allTags: any[];
  @Output() updateTagsEvent: EventEmitter<any> = new EventEmitter();

  tagsList: FormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new CustomErrorStateMatcher();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageTags.currentValue !== changes.pageTags.previousValue) {
      this.pageTags = changes.pageTags.currentValue;
    }
  }

  updateTags() {
    const existingTag = this.allTags.find(tag => tag.tag_desc === this.tagsList.value);
    let tagCandidate;

    if (existingTag) {
      if (this.pageHasTag(existingTag)) {
        this.cancelUpdate();
        return;
      }

      tagCandidate = existingTag;
    } else {
      const tagIds = this.allTags.map(tag => tag.tag_id);
      let latestId = Math.max(...tagIds);

      tagCandidate = {
        tag_id: ++latestId,
        tag_desc: this.tagsList.value
      }
    }

    this.updateTagsEvent.emit([...this.pageTags, tagCandidate]);
  }

  pageHasTag(tagCandidate) {
    return this.pageTags.some(tag => tag.tag_desc === tagCandidate.tag_desc);
  }

  removeTag(doomedTag) {
    const updatedTags = this.pageTags.filter(tag => tag.tag_desc !== doomedTag.tag_desc);
    this.updateTagsEvent.emit(updatedTags);
  }

  cancelUpdate() {
    this.updateTagsEvent.emit(null);
  }

}
