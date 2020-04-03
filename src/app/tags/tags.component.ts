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
export class TagsComponent {
// export class TagsComponent implements OnChanges {
  // @Input() pageId: string;
  // pageTags: any[];
  // allTags: any[];
  // updateMode: boolean = false;

  // constructor(private tagsService: TagsService,
  //             private authenticationService: AuthenticationService,
  //             private notificationService: NotificationService) {
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.pageId.currentValue !== changes.pageId.previousValue) {
  //     this.pageId = changes.pageId.currentValue;
  //   }
  //   this.getTagData(this.pageId);
  //   this.getAllTags();
  // }

  // getTagData(pageId) {
  //   this.tagsService.getTagData(pageId)
  //   .pipe(take(1))
  //   .subscribe(data => {
  //     this.pageTags = data ? data : [];
  //   });
  // }

  // getAllTags() {
  //   this.tagsService.getAllTags()
  //   .pipe(take(1))
  //   .subscribe(data => {
  //     this.allTags = data ? data : [];
  //   });
  // }

  // handleUpdateTagsEvent(updatedTags) {
  //   if (updatedTags) {
  //     this.pageTags = updatedTags;

  //     const tagData = {
  //       pageId: this.pageId,
  //       tags: this.pageTags
  //     }

  //     this.tagsService.updateTags(tagData)
  //       .pipe(take(1))
  //       .subscribe(resp => {
  //         this.notificationService.notify('success', resp.message)
  //       });
  //   }
  //   this.toggleUpdateTags();
  // }

  // toggleUpdateTags() {
  //   if (!this.authenticationService.isLoggedIn()) {
  //     return;
  //   }
  //   this.updateMode = !this.updateMode;
  // }
}
