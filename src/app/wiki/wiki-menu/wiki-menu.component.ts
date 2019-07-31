import { Component, OnInit, HostListener } from '@angular/core';
import { take } from 'rxjs/operators';

import { WikiService } from '../wiki.service';
import { NotificationService } from '../../shared/notification.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class MenuComponent implements OnInit {
  pageMenuActive: boolean = false;
  pageMenuItems = [];
  filteredMenuItems = [];
  loginStatusSub: Subscription;
  userIsLoggedIn = false;

  constructor(private wikiService: WikiService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
      this.loginStatusSub = this.authenticationService.logInEvent$.subscribe(() => {
        this.checkLoginStatus();
      });

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

}