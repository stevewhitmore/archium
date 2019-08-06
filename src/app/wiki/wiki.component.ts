import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiModel } from '../_shared/models';
import { WikiService } from './wiki.service';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

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
              private wikiService: WikiService) {
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
      .subscribe(resp => {
        
      })
  }

  handleEditEvent() {
    this.toggleEditForm();
  }

  handleCreateModalEvent() {
    this.toggleAddFormOn();
  }

  toggleEditForm() {
    this.editFormOn = !this.editFormOn;
  }

  toggleAddFormOn() {
    this.addFormOn = !this.addFormOn;
  }

  ngOnDestroy() {
    if (this.routeSub) { this.routeSub.unsubscribe(); }
  }

}
