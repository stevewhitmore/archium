import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { NotifierService } from 'angular-notifier';
import { MenuService } from '../_services/menu.service';
import { WikiService } from '../_services/wiki.service';
import { WikiModel } from '../wiki/wiki.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  createModalOpen = false;
  pagePath = '';
  inputPath = new FormControl('', [Validators.required]);

  constructor(private menuService: MenuService,
              private wikiService: WikiService,
              private notifierService: NotifierService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuService.pagePaths$.subscribe(path => {      
      this.pagePath = path;
    });
  }

  createWikiPage() {
    this.wikiService.createPage(this.inputPath.value).pipe(take(1)).subscribe(resp => {
      this.successfulUpdate(resp, this.inputPath.value);
    }, resp => {
      this.unsuccessfulUpdate(resp);
    });
  }

  successfulUpdate(resp, newWikiPath) {
    this.notifierService.notify('success', `Status ${resp.status}: Wiki created!`);
    this.menuService.updatePagePath(newWikiPath);
    this.inputPath.reset();
    this.toggleCreateModal();
    this.router.navigateByUrl('/page/' + newWikiPath);
  }

  unsuccessfulUpdate(resp) {
    this.notifierService.notify('error', `Status ${resp.status}: Failed to create wiki. See logs for details.`);
  }

  toggleCreateModal() {
    this.createModalOpen = !this.createModalOpen;
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

}
