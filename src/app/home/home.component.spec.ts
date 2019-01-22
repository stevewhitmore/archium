import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { MenuServiceStub } from '../_testing/stubs';
import { MenuService } from '../_services';

const menuService = new MenuServiceStub;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {provide: MenuService, useValue: menuService},
        HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should update page path in toolbar on init', () => {
    spy = spyOn(menuService, 'updatePagePath');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
