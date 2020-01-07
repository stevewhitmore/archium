import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WikiMenuComponent } from './wiki-menu.component';
import { Component, DebugElement } from '@angular/core';

import { WikiService } from '../wiki.service';
import { NotificationService } from '../../_shared/notification.service';
import { AuthenticationService } from '../../_shared/security/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

import {
  WikiServiceStub,
  NotificationServiceStub,
  AuthenticationServiceStub
} from '../../_shared/testing/stubs';
import { StoreStub } from 'src/app/_shared/testing/stubs/store.stub';
import { Store } from '@ngrx/store';
import * as Actions from '../../state/actions';

const wikiServiceStub = new WikiServiceStub();
const notificationServiceStub = new NotificationServiceStub();
const authenticationServiceStub = new AuthenticationServiceStub();
const storeStub = new StoreStub();

@Component({
  selector: 'app-login',
  template: '<div></div>'
})
export class FakeLoginComponent {}

describe('WikiMenuComponent', () => {
  let component: WikiMenuComponent;
  let fixture: ComponentFixture<WikiMenuComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ WikiMenuComponent, FakeLoginComponent ],
      providers: [
        { provide: WikiService, useValue: wikiServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    })

    fixture = TestBed.createComponent(WikiMenuComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('isolated tests', () => {

    describe('getting menu data', () => {
      it('should call API request method for all page paths', () => {
        const spy = spyOn(wikiServiceStub, 'getAllPageLinks').and.callThrough();

        component.getAllPagePaths();

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should call togglePageMenuActive()', () => {
        const spy = spyOn(component, 'togglePageMenuActive');

        component.pageMenuClicked();

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should call getAllPagePaths() if pageMenuActive', () => {
        const spy = spyOn(component, 'getAllPagePaths').and.callThrough();
        component.pageMenuActive = false; //toggles from togglePageMenuActive()

        component.pageMenuClicked();

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should check to see if user is logged in', () => {
        const spy = spyOn(authenticationServiceStub, 'isLoggedIn');

        component.checkLoginStatus();

        expect(spy).toHaveBeenCalledTimes(1);
      });
    }); //getting menu data

    describe('toggling of boolean properties', () => {
      it('should set pageMenuActive to false', () => {
        component.pageMenuActive = true;

        component.toggleMenuOff();

        expect(component.pageMenuActive).toBe(false);
      });

      it('should toggle pageMenuActive between true and false', () => {
        component.pageMenuActive = false;

        component.togglePageMenuActive();

        expect(component.pageMenuActive).toBe(true);
      });
    }); //toggling of boolean properties

    describe('change state', () => {
      it('should change to EditMode state on toggleEdit', () => {
        const spy = spyOn(storeStub, 'dispatch');

        component.toggleEdit();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Actions.EditMode());
      });

      it('should change to AddMode state on toggleCreateModal', () => {
        const spy = spyOn(storeStub, 'dispatch');

        component.toggleCreateModal();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Actions.AddMode());
      });

      it('should change to DeleteMode state on toggleDeleteModal', () => {
        const spy = spyOn(storeStub, 'dispatch');

        component.toggleDeleteModal();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Actions.DeleteMode());
      });
    }); //emitting events

    describe('filtering menu items', () => {
      it('should create an empty array if there\'s no input', () => {
        component.filterItemsByInput(null);

        expect(component.filteredMenuItems.length).toBe(0);
      });

      it('should create an array of menu items matching input', () => {
        component.filterItemsByInput('bro');

        expect(component.filteredMenuItems.length).toBe(1);
        expect(component.filteredMenuItems[0].path).toBe('bro-do-you-even-js');
      });
    }); //filtering menu items

  }); //isolated tests

  describe('shallow integration tests', () => {

    describe('menu button', () => {
      it('should trigger pageMenuClicked() when clicked', () => {
        const spy = spyOn(component, 'pageMenuClicked');
        const menuButton = debugEl.query(By.css('#page-menu-wrap > button'));

        menuButton.triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should have the \'active\' class if pageMenuActive is true', () => {
        const pageMenuWrap = debugEl.query(By.css('#page-menu-wrap'));

        component.pageMenuActive = true;
        fixture.detectChanges();

        expect(pageMenuWrap.nativeElement.classList).toContain('active');
      });
    }); //menu button

    describe('edit button', () => {
      it('should be button be disabled by default', () => {
        expect(debugEl.query(By.css('#edit-page')).nativeElement.disabled).toBe(true);
      });

      it('should be enabled when user is logged in and page is loaded', () => {
        component.userIsLoggedIn = true;
        component.pageIsLoaded = true;
        fixture.detectChanges();

        expect(debugEl.query(By.css('#edit-page')).nativeElement.disabled).toBe(false);
      });

      it('should trigger toggleEdit() on click', () => {
        const spy = spyOn(component, 'toggleEdit');
        component.userIsLoggedIn = true;
        component.pageIsLoaded = true;
        fixture.detectChanges();

        debugEl.query(By.css('#edit-page')).triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledTimes(1);
      });
    }); //edit button

    describe('add button', () => {
      it('should be disabled by default', () => {
        expect(debugEl.query(By.css('#add-new-page')).nativeElement.disabled).toBe(true);
      });

      it('should be enabled when user is logged in', () => {
        component.userIsLoggedIn = true;

        fixture.detectChanges();

        expect(debugEl.query(By.css('#add-new-page')).nativeElement.disabled).toBe(false);
      });

      it('should trigger toggleCreateModal() on click', () => {
        const spy = spyOn(component, 'toggleCreateModal');
        component.userIsLoggedIn = true;
        fixture.detectChanges();

        debugEl.query(By.css('#add-new-page')).triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledTimes(1);
      });
    }); //add button

    describe('delete button', () => {
      it('should be button be disabled by default', () => {
        expect(debugEl.query(By.css('#delete-page')).nativeElement.disabled).toBe(true);
      });

      it('should be enabled when user is logged in and page is loaded', () => {
        component.userIsLoggedIn = true;
        component.pageIsLoaded = true;
        fixture.detectChanges();

        expect(debugEl.query(By.css('#delete-page')).nativeElement.disabled).toBe(false);
      });

      it('should trigger toggleDeleteModal() on click', () => {
        const spy = spyOn(component, 'toggleDeleteModal');
        component.userIsLoggedIn = true;
        component.pageIsLoaded = true;
        fixture.detectChanges();

        debugEl.query(By.css('#delete-page')).triggerEventHandler('click', null);

        expect(spy).toHaveBeenCalledTimes(1);
      });
    }); //delete button

  }); //shallow integration tests
});
