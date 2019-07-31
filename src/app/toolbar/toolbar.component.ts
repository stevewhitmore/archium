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
export class ToolbarComponent implements OnInit {

  username: string;
  loginEventSub: Subscription;
  currentRoute: string;
  toolbarContainerEl: any;
  loginModalOn = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
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

  logIn() {
    if (!this.authenticationService.isLoggedIn()) {
      this.toggleLoginModal();
    }
  }

  logOut() {
    this.authenticationService.logOut();
  }

  toggleLoginModal() {
    this.loginModalOn = !this.loginModalOn;
  }

}
