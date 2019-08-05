import { Component, OnInit, OnDestroy, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { WikiService } from '../wiki.service';
import { NotificationService } from '../../_shared/notification.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/security/authentication.service';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() toggleCreateModalEvent = new EventEmitter();
  pageMenuActive: boolean = false;
  pageMenuItems = [];
  filteredMenuItems = [];
  loginStatusSub: Subscription;
  userIsLoggedIn = false;

  constructor(private wikiService: WikiService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private eRef: ElementRef) {
  }

  ngOnInit() {
      this.loginStatusSub = this.authenticationService.logInEvent$.subscribe(() => {
        this.checkLoginStatus();
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

  filterMenuItems(input) {
    if (!input) {
      this.filteredMenuItems = [];
      return;
    }
    this.filteredMenuItems = this.pageMenuItems.filter(item => item.title.toLowerCase().indexOf(input.toLowerCase()) > -1);
  }

  checkLoginStatus() {
    this.userIsLoggedIn = this.authenticationService.isLoggedIn();
  }

  toggleCreateModal() {
    console.log('toggleCreateModal inside menu');
    this.toggleCreateModalEvent.emit(null);
  }

  ngOnDestroy() {
    if (this.loginStatusSub) this.loginStatusSub.unsubscribe();
  }

}
