import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  username: string;
  loginEventSub: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginEventSub = this.authenticationService.logInEvent$
        .subscribe(() => {
          this.getUsername();
        });

    this.getUsername();
  }

  viewChange(viewLink) {
    console.log(viewLink);
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
