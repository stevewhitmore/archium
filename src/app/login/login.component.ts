import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  returnUrl: string;
  loginSub: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.buildForm();

    this.authenticationService.logout();

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

    this.loginSub = this.authenticationService.login(username, password)
                              .pipe(take(1))
                              .subscribe(() => {
                                this.notifierService.notify('success', 'Login successful!');
                                this.router.navigate([this.returnUrl]);
                              }, error => {
                                this.notifierService.notify('error', error.message);
                              });


  }

  ngOnDestroy() {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

}
