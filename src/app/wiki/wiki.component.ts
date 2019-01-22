import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { NotifierService } from 'angular-notifier';
import { WikiService } from '../_services/wiki.service';
import { MenuService } from '../_services/menu.service';

import { WikiModel } from './wiki.model';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit {
  editMode = false;
  inputContent = new FormControl('');
  contentValueSnapshot;
  wikiPage: WikiModel = {path: null, pageContent: null, dateCreated: null, dateUpdated: null};
  pagePath: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private wikiService: WikiService,
              private menuService: MenuService,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if(params['page'] !== undefined) {
        let path = params['page'];
        this.getPageData(path);
        this.menuService.updatePagePath(path);
      } else {
        this.notifierService.notify('error', 'Page not found. Redirecting home.');
        this.router.navigateByUrl('/');
      }
    });
  }

  getPageData(path) {
    this.wikiService.getPageData(path).pipe(take(1))
          .subscribe(data => {
            this.wikiPage = data;
            this.inputContent.setValue(this.wikiPage.pageContent);          
          });
  }

  updateContentValue(el) {   
    this.wikiPage.pageContent = el.value;
  }

  handleSaveKeyCombos(e) {
    const charCode = String.fromCharCode(e.which).toLowerCase();
    const saveKeyCombo = e.ctrlKey && charCode === 's';
    const saveKeyComboMac = e.metaKey && charCode === 's';
    if (saveKeyCombo || saveKeyComboMac) {
      e.preventDefault();
      this.saveWiki();
    }
  }

  saveWiki() {
    this.wikiService.updatePageContent(this.wikiPage).subscribe(resp => {
      this.successfulUpdate(resp);
    }, resp => {
      this.unsuccessfulUpdate(resp);
    });
  }

  successfulUpdate(resp) {
    this.getPageData(resp.body.path);
    this.toggleEditWiki();
    this.notifierService.notify('success', `Status ${resp.status}: Changes saved!`);
  }

  unsuccessfulUpdate(resp) {
    this.notifierService.notify('error', `Status ${resp.status}: Failed to save changes. See logs for details.`);
  }

  cancelEditWiki() {
    let intentionalQuit;

    if (this.contentValueSnapshot === this.wikiPage.pageContent) {
      this.toggleEditWiki();
      return;
    }

    intentionalQuit = confirm('Changes detected. Are you sure you want to stop editing? All progress will be lost!');
    
    if (!intentionalQuit) {
      return;
    }
    this.wikiPage.pageContent = this.contentValueSnapshot;
    this.inputContent.setValue(this.wikiPage.pageContent);
    this.toggleEditWiki();
  }

  turnEditModeOn() {
    if (!this.editMode) {
      this.contentValueSnapshot = this.wikiPage.pageContent;
      this.toggleEditWiki();  
    }
  }

  toggleEditWiki() {
    this.editMode = !this.editMode;
  }

}
