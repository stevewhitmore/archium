import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiModel } from '../_shared/models';
import { WikiService } from './wiki.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
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
        if (!this.pageContent.content) {
          this.pageContent.content = ' ';
        }
      });
  }

  savePageEdits(page) {
    if (page) {
      this.wikiService.savePageChanges(page)
        .pipe(take(1))
        .subscribe(() => {
          this.notificationService.notify('success', 'Page updated!');
          this.toggleEditForm();
          this.getPageContent(page.path);
        }, () => {
          this.notificationService.notify('error', 'Unable to update page');
        })
    } else {
      this.toggleEditForm();
    }
  }

  addNewPage(title) {
    if (title) {
      const path = title.replace(/ /g, '-').toLowerCase();
      this.wikiService.createPage(title)
      .subscribe(() => {
        this.notificationService.notify('success', 'New page created!');
        this.toggleAddForm();
        this.router.navigate(['/wiki/', path]);
      }, () => {
        this.notificationService.notify('error', 'Unable to create new page');
      });
    } else {
      this.toggleAddForm();
    }
  }

  deletePage(path) {
    if (path) {
      this.wikiService.deletePage(path)
      .subscribe(() => {
        this.notificationService.notify('success', 'Page deleted!');
        this.toggleDeleteConfirm();
        this.router.navigateByUrl('/wiki');
      }, () => {
        this.notificationService.notify('error', 'Unable to delete page');
      });
    } else {
      this.toggleDeleteConfirm();
    }
  }

  toggleEditForm() {
    this.editFormOn = !this.editFormOn;
  }

  toggleAddForm() {
    this.addFormOn = !this.addFormOn;
  }


  toggleDeleteConfirm() {
    this.deleteConfirmOn = !this.deleteConfirmOn;
  }

  ngOnDestroy() {
    if (this.routeSub) { this.routeSub.unsubscribe(); }
  }

}
