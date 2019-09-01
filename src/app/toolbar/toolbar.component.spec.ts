import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceStub } from '../_shared/testing/stubs/authentication-service.stub';
import { AuthenticationService } from '../_shared/security/authentication.service';

const authenticationServiceStub = new AuthenticationServiceStub();

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ToolbarComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
