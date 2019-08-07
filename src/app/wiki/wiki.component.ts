import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiModel } from '../_shared/models';
import { WikiService } from './wiki.service';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from '../_shared/notification.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  path: string = 'default';
  pageContent: any;
  editFormOn = false;
  addFormOn = false;

  constructor(private route: ActivatedRoute,
              private wikiService: WikiService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params) {
        this.path = params['page'];
        if (this.path) {
          this.getPageContent(this.path);
        }
      }
    });

  }

  getPageContent(path) {
    this.wikiService.getPageContent(path)
      .pipe(take(1))
      .subscribe(data => {
        this.pageContent = data ? data : '';
      });
  }

  savePageEdits(page) {
    this.wikiService.savePageChanges(page)
      .pipe(take(1))
      .subscribe(resp => {
        this.toggleEditForm();
        this.getPageContent(page.path);
        this.notificationService.notify('success', resp.message);
      }, error => {
        this.notificationService.notify('error', error.message);
      })
  }

  toggleEditForm() {
    this.editFormOn = !this.editFormOn;
  }

  toggleAddForm() {
    this.addFormOn = !this.addFormOn;
  }

  ngOnDestroy() {
    if (this.routeSub) { this.routeSub.unsubscribe(); }
  }

}
