import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { WikiService } from '../wiki.service';
import { EventEmitter } from 'events';
import { NotificationService } from 'src/app/_shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wiki-add',
  templateUrl: './wiki-add.component.html',
  styleUrls: ['./wiki-add.component.scss']
})
export class WikiAddComponent {
  @Output() toggleCreateModalEvent = new EventEmitter();
  inputPath = new FormControl('', [Validators.required]);

  constructor(private wikiService: WikiService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  createWikiPage() {
    this.wikiService.createPage(this.inputPath.value)
      .pipe(take(1))
      .subscribe(resp => {
        this.successfulUpdate(resp);
      }, resp => {
        this.unsuccessfulUpdate(resp);
      });
  }

  successfulUpdate(resp) {
    this.notificationService.notify('success', resp.message);
    this.inputPath.reset();
    this.toggleCreateModalEvent.emit(null);
  }

  unsuccessfulUpdate(resp) {
    this.notificationService.notify('error', resp.message);
    this.toggleCreateModalEvent.emit(null);
  }

  toggleCreateModal() {
    this.toggleCreateModalEvent.emit(null);
  }
}
