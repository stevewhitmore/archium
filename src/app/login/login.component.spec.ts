import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { AuthenticationServiceStub, NotifierServiceStub } from '../_testing/stubs';
import { AuthenticationService } from '../_services';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DebugElement } from '@angular/core';

const authenticationService = new AuthenticationServiceStub();
const notifierService = new NotifierServiceStub();

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: NotifierService, useValue: notifierService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should build the login form', () => {
    const form = component.loginForm;
    expect(form).toBeTruthy();
    expect(form.get('username')).toBeTruthy();
    expect(form.get('password')).toBeTruthy();
  });

  it('should call onSubmit when login button is clicked', () => {
    const spy = spyOn(component, 'onSubmit');
    const loginButton = debugEl.nativeElement.querySelector('#login-form-button');    
    component.loginForm.setValue({username: 'swhitmore', password: 'bunnies99'});
    fixture.detectChanges();

    loginButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should call authenticationService.login() on submit', () => {
    const spy = spyOn(authenticationService, 'login').and.callThrough();

    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
  });

  it('should show success message on successful submit', fakeAsync(() => {
    const spy = spyOn(notifierService, 'notify').and.callThrough();
    const form = component.loginForm;
    form.setValue({username: 'swhitmore', password: 'bunnies99'});

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(authenticationService.sendSuccessResponse).toBeTruthy();
    expect(spy).toHaveBeenCalledWith('success', 'Login successful!');    
    expect(spy.calls.count()).toBe(1);
  }));

  it('should show error message on unsuccessful submit', fakeAsync(() => {
    const spy = spyOn(notifierService, 'notify').and.callThrough();
    const form = component.loginForm;
    form.setValue({username: 'swhitmore', password: 'hurrrrp'});    

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(authenticationService.sendSuccessResponse).toBeFalsy();
    expect(spy).toHaveBeenCalledWith('error', 'Error! 400 Bad Request');  
    expect(spy.calls.count()).toBe(1);  
  }));

  it('should log the user out on init', () => {    
    // authenticationService.logout() gets called on component init
    expect(authenticationService.loggedIn).toBeFalsy();
  });
});
