import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceStub } from 'src/app/_shared/testing/stubs/authentication-service.stub';
import { AuthenticationService } from '../_shared/security/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/_shared/notification.service';
import { NotificationServiceStub } from 'src/app/_shared/testing/stubs/notification-service.stub';
import { DebugElement } from '@angular/core';

const authenticationServiceStub = new AuthenticationServiceStub();
const notificationServiceStub = new NotificationServiceStub();

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ReactiveFormsModule ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isolated tests', () => {
    it('should call authenticationService.logOut()', () => {
      const spy = spyOn(authenticationServiceStub, 'logOut');

      component.logOut();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have loginModalOn off by default', () => {
      expect(component.loginModalOn).toBe(false);
    });

    it('should toggle off login modal', () => {
      component.loginModalOn = true;

      component.toggleLoginModalOff();

      expect(component.loginModalOn).toBe(false);
    });

    it('should toggle off login modal', () => {
      component.toggleLoginModalOn();

      expect(component.loginModalOn).toBe(true);
    });

    it('should check to see if the user is logged in', () => {
      const spy = spyOn(authenticationServiceStub, 'isLoggedIn');

      component.checkLoginStatus();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  }); //isolated tests

  describe('shallow integration tests', () => {
    it('should trigger logOut() when Log Out button is clicked', () => {
      const spy = spyOn(component, 'logOut');
      component.userIsLoggedIn = true;
      fixture.detectChanges();

      const logoutWrapper = debugEl.query(By.css('#logout-wrapper'));
      logoutWrapper.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should trigger toggleLoginModalOn() when Log In button is clicked', () => {
      const spy = spyOn(component, 'toggleLoginModalOn');

      const logoutWrapper = debugEl.query(By.css('#login-wrapper'));
      logoutWrapper.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the login modal', () => {
      const logoutWrapper = debugEl.query(By.css('#login-wrapper'));
      logoutWrapper.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.loginModalOn).toBe(true);
      expect(debugEl.query(By.css('#login-container'))).toBeTruthy();
    });

    describe('form validation checks', () => {
      it('login button should be disabled if no fields are populated', () => {
        const logoutWrapper = debugEl.query(By.css('#login-wrapper'));
        logoutWrapper.triggerEventHandler('click', null);
        fixture.detectChanges();

        const loginButton = debugEl.query(By.css('#login-form-button'));
        console.log(loginButton.nativeElement);
        expect(loginButton.nativeElement.disabled).toBe(true);
      });
    }); //form validation checks

  }); //shallow integration tests

});
