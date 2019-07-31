import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from "@angular/common";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  username: string;
  loginEventSub: Subscription;
  currentRoute: string;
  toolbarContainerEl: any;
  loginStatusSub: Subscription;
  loginModalOn = false;
  userIsLoggedIn = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.loginStatusSub = this.authenticationService.logInEvent$.subscribe(() => {
      this.checkLoginStatus();
    });

    this.checkLoginStatus();
    this.setInitialToolbarStyling();
  }

  setInitialToolbarStyling() {
    this.toolbarContainerEl = document.querySelector('#toolbar-container');

    this.router.events
      .pipe(take(1))
      .subscribe(() => {
        if (this.location.path() != "") {
          let path = this.location.path();
          this.currentRoute = path.slice(1).split('/', 1)[0];
        } else {
          this.currentRoute = "home";
        }
        this.toolbarContainerEl.classList.add(this.currentRoute);
      });
  }

  updateToolbarClassList(viewLink: string) {
    viewLink = viewLink ? viewLink : 'home';
    this.clearClassList(this.toolbarContainerEl);
    viewLink = viewLink.toLowerCase().trim();
    
    this.toolbarContainerEl.classList.add(viewLink);

  }

  clearClassList(el) {
    const classList = el.classList;

    while (classList.length > 0) {
       classList.remove(classList.item(0));
    }
  }

  logIn() {
    this.toggleLoginModal();
  }

  logOut() {
    this.authenticationService.logOut();
  }

  toggleLoginModal() {
    this.loginModalOn = !this.loginModalOn;
  }

  checkLoginStatus() {
    this.userIsLoggedIn = this.authenticationService.isLoggedIn();
  }

  ngOnDestroy() {
    if (this.loginStatusSub) this.loginStatusSub.unsubscribe();
  }

}
