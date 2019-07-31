import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
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
export class LoginComponent implements OnInit {
  @Output() toggleLoginModal: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup;
  returnUrl: string;
  loginSub: Subscription;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.buildForm();

    this.authenticationService.logOut();
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
                              }, error => {
                                this.notificationService.notify('error', error.message);
                              });
  }

  clickedCancel() {
    this.toggleLoginModal.emit();
  }

}
