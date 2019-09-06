import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceStub } from 'src/app/_shared/testing/stubs/authentication-service.stub';
import { AuthenticationService } from '../../_shared/security/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/_shared/notification.service';
import { NotificationServiceStub } from 'src/app/_shared/testing/stubs/notification-service.stub';

const authenticationServiceStub = new AuthenticationServiceStub();
const notificationServiceStub = new NotificationServiceStub();

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
