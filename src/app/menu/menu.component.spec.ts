import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuServiceStub, AuthenticationServiceStub } from '../_testing/stubs';
import { MenuService, AuthenticationService } from '../_services';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const authenticationServiceStub = new AuthenticationServiceStub();
const menuServiceStub = new MenuServiceStub();

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceStub},
        {provide: MenuService, useValue: menuServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should add \'active\' class to menu on toggle', () => {
    const menu = debugEl.nativeElement.querySelector('#menu');
    component.toggleMenu();

    expect(menu.classList).toContain('active');
  });

  it('should make sure the user is logged in', () => {
    const spy = spyOn(authenticationServiceStub, 'isLoggedIn');
    component.toggleMenu();
    expect(spy).toHaveBeenCalled();
  });

  it('should fetch page paths if menu is active and user is logged in', fakeAsync(() => {
    const spy = spyOn(component, 'getPagePaths').and.callThrough();
    component.toggleMenu();    
    tick();
    
    expect(spy).toHaveBeenCalled();
  }));

  it('should NOT fetch page paths if menu is active and user is not logged in', () => {
    authenticationServiceStub.loggedIn = false;
    component.toggleMenu();
    
    expect(component.menuItems.length).toBe(0);
  });

  it('should filter menu items based on keyed in values', () => {    
    component.menuItems = menuServiceStub.wikiPagePaths;    
    component.filterMenuItems('3');
    expect(component.filteredMenuItems.length).toBe(1);
  });
  
});
