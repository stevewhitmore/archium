import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule } from '../app.module';
import { WikiComponent } from './wiki.component';

import { AuthenticationService, MenuService, WikiService } from '../_services';
import { ActivatedRouteStub, AuthenticationServiceStub, MenuServiceStub, WikiServiceStub } from '../_testing/stubs';
import { ActivatedRoute } from '@angular/router';

const activatedRouteStub = new ActivatedRouteStub()
const authenticationServiceStub = new AuthenticationServiceStub();
const menuServiceStub = new MenuServiceStub();
const wikiServiceStub = new WikiServiceStub;

describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: AuthenticationService, useValue: authenticationServiceStub},
        {provide: MenuService, useValue: menuServiceStub},
        {provide: WikiService, useValue: wikiServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(WikiComponent);
    component = fixture.componentInstance;
    activatedRouteStub.testParams = {page: 'example2'}
    fixture.detectChanges();
  }));

  it('should fetch data based on path provided', fakeAsync(() => {
    const spy = spyOn(wikiServiceStub, 'getPageData').and.callThrough();
    tick();
    
    console.log('activatedRouteStub.testParams: ', activatedRouteStub.testParams)
    expect(spy).toHaveBeenCalled();
  }));
});
