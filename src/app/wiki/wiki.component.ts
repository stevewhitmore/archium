import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../state/reducer';
import * as Actions from '../state/actions';

import { WikiModel } from '../_shared/models';
import { WikiService } from './wiki.service';
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
  pageTags: any;
  editFormOn = false;
  addFormOn = false;
  deleteConfirmOn = false;
  isHome = true;

  viewState$: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wikiService: WikiService,
              private notificationService: NotificationService,
              private store: Store<AppState>) {
    this.viewState$ = this.store.select('view');
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params) {
        this.path = params['page'];
        if (this.path) {
          this.getPageContent(this.path);
          this.isHome = false;
        }
      }
    });
  }

  getPageContent(path) {
    this.wikiService.getPageContent(path)
      .pipe(take(1))
      .subscribe(data => {
        this.pageContent = data;
        if (!this.pageContent.content) {
          this.pageContent.content = '';
        }
      });
  }

  savePageEdits(page) {
    if (page) {
      this.wikiService.savePageChanges(page)
        .pipe(take(1))
        .subscribe(() => {
          this.notificationService.notify('success', 'Page updated!');
          this.resetView();
          this.getPageContent(page.path);
        }, () => {
          this.notificationService.notify('error', 'Unable to update page');
        })
    } else {
      this.resetView();
    }
  }

  addNewPage(title) {
    if (title) {
      const path = title.replace(/ /g, '-').toLowerCase();
      this.wikiService.createPage(title)
      .subscribe(() => {
        this.notificationService.notify('success', 'New page created!');
        this.resetView();
        this.router.navigate(['/wiki/', path]);
      }, () => {
        this.notificationService.notify('error', 'Unable to create new page');
      });
    } else {
      this.resetView();
    }
  }

  deletePage(path) {
    if (path) {
      this.wikiService.deletePage(path)
      .subscribe(() => {
        this.notificationService.notify('success', 'Page deleted!');
        this.resetView();
        this.router.navigateByUrl('/wiki');
      }, () => {
        this.notificationService.notify('error', 'Unable to delete page');
      });
    } else {
      this.resetView();
    }
  }

  resetView() {
    this.store.dispatch(new Actions.ViewMode());
  }

  ngOnDestroy() {
    if (this.routeSub) { this.routeSub.unsubscribe(); }
  }

}
