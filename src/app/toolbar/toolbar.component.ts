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

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.loginEventSub = this.authenticationService.logInEvent$
        .subscribe(() => {
          this.getUsername();
        });

    this.getUsername();
    this.setInitialToolbarStyling();
  }

  setInitialToolbarStyling() {
    this.toolbarContainerEl = document.querySelector('#toolbar-container');

    this.router.events
      .pipe(take(1))
      .subscribe(() => {
        if (this.location.path() != "") {
          this.currentRoute = this.location.path();
        } else {
          this.currentRoute = "/home";
        }
        this.toolbarContainerEl.classList.add(this.currentRoute.slice(1));
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

  getUsername() {
    this.username = this.authenticationService.getUserName();
  }

  logIn() {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  logOut() {
    this.authenticationService.logOut();
  }

  ngOnDestroy() {
    if (this.loginEventSub) { this.loginEventSub.unsubscribe(); }
  }

}
