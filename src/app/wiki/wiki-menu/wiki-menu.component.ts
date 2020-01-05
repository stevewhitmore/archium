import { Component, OnInit, OnDestroy, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { WikiService } from '../wiki.service';
import { NotificationService } from '../../_shared/notification.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/security/authentication.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducer';
import * as Actions from '../../state/actions';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class WikiMenuComponent implements OnInit, OnDestroy {
  pageMenuActive: boolean = false;
  pageMenuItems = [];
  filteredMenuItems = [];
  loginStatusSub: Subscription;
  pageStatusSub: Subscription;
  userIsLoggedIn = false;
  pageIsLoaded = false;

  constructor(private wikiService: WikiService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private eRef: ElementRef,
              private store: Store<AppState>) {
  }

  ngOnInit() {
      this.loginStatusSub = this.authenticationService.logInEvent$.subscribe(() => {
        this.checkLoginStatus();
      });

      this.pageStatusSub = this.wikiService.pageLoadedEvent$.subscribe(() => {
        this.pageIsLoaded = true;
      });

      this.checkLoginStatus();
      this.getAllPagePaths();
  }

  getAllPagePaths() {
    this.wikiService.getAllPageLinks()
      .pipe(take(1))
      .subscribe(resp => {
        this.pageMenuItems = resp;
      }, err => {
        this.notificationService.notify('error', err.message);
      });
  }

  pageMenuClicked() {
    this.togglePageMenuActive();
    if (this.pageMenuActive) {
      this.getAllPagePaths();
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.toggleMenuOff()
    }
  }

  toggleMenuOff() {
    this.pageMenuActive = false;
  }

  togglePageMenuActive() {
    this.pageMenuActive = !this.pageMenuActive;
  }

  filterItemsByInput(input) {
    if (!input) {
      this.filteredMenuItems = [];
      return;
    }
    this.filteredMenuItems = this.pageMenuItems.filter(item => item.title.toLowerCase().indexOf(input.toLowerCase()) > -1);
  }

  toggleEdit() {
    this.store.dispatch(new Actions.EditMode());
  }

  toggleCreateModal() {
    this.store.dispatch(new Actions.AddMode());
  }

  toggleDeleteModal() {
    this.store.dispatch(new Actions.DeleteMode());
  }

  checkLoginStatus() {
    this.userIsLoggedIn = this.authenticationService.isLoggedIn();
  }

  ngOnDestroy() {
    if (this.loginStatusSub) this.loginStatusSub.unsubscribe();
  }

}
