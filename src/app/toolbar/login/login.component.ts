import { Component, OnInit, HostListener, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '../../security/authentication.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  returnUrl: string;
  loginSub: Subscription;
  loginStatusSub: Subscription;
  loginModalOn = false;
  userIsLoggedIn = false;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private eRef: ElementRef) {
  }

  ngOnInit() {
    this.buildForm();

    this.loginStatusSub = this.authenticationService.logInEvent$.subscribe(() => {
      this.checkLoginStatus();
    });

    this.checkLoginStatus();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.authenticationService.login(username, password)
                              .pipe(take(1))
                              .subscribe(() => {
                                this.notificationService.notify('success', 'Login successful!');
                                this.authenticationService.userLoginEvent();
                                this.toggleLoginModalOff();
                              }, error => {
                                this.notificationService.notify('error', 'Login unsuccessful :(');
                              });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.toggleLoginModalOff();
    } else {
      this.toggleLoginModalOn();
    }
  }

  logOut() {
    this.authenticationService.logOut();
  }

  toggleLoginModalOff() {
    this.loginModalOn = false;
  }

  toggleLoginModalOn() {
    this.loginModalOn = true;
  }

  checkLoginStatus() {
    this.userIsLoggedIn = this.authenticationService.isLoggedIn();
  }

  ngOnDestroy() {
    if (this.loginStatusSub) this.loginStatusSub.unsubscribe();
  }

}
