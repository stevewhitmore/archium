import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { TagsService } from './tags.service';
import { AuthenticationService } from '../_shared/security/authentication.service';
import { NotificationService } from '../_shared/notification.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnChanges {
  @Input() path: string;
  pageTags: any[];
  allTags: any[];
  updateMode: boolean = false;

  constructor(private tagsService: TagsService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.path.currentValue !== changes.path.previousValue) {
      this.path = changes.path.currentValue;
    }
    this.getTagData(this.path);
    this.getAllTags();
  }

  getTagData(path) {
    this.tagsService.getTagData(path)
    .pipe(take(1))
    .subscribe(data => {
      this.pageTags = data ? data : [];
    });
  }

  getAllTags() {
    this.tagsService.getAllTags()
    .pipe(take(1))
    .subscribe(data => {
      this.allTags = data ? data : [];
    });
  }

  handleUpdateTagsEvent(updatedTags) {
    if (updatedTags) {
      this.pageTags = updatedTags;

      const tagData = {
        path: this.path,
        tags: this.pageTags
      }

      this.tagsService.updateTags(tagData)
        .pipe(take(1))
        .subscribe(resp => {
          this.notificationService.notify('success', resp.message)
        });
    }
    this.toggleUpdateTags();
  }

  toggleUpdateTags() {
    if (!this.authenticationService.isLoggedIn()) {
      return;
    }
    this.updateMode = !this.updateMode;
  }
}
