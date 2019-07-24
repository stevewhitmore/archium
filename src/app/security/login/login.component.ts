import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loginSub: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.buildForm();

    this.authenticationService.logOut();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
                                this.router.navigate([this.returnUrl]);
                                this.authenticationService.userLoginEvent();
                              }, error => {
                                this.notificationService.notify('error', error.message);
                              });


  }

}
