import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarComponent } from './toolbar.component';
import { WikiService, MenuService } from '../_services';
import { WikiServiceStub, MenuServiceStub, NotifierServiceStub } from '../_testing/stubs';
import { NotifierService } from 'angular-notifier';
import { DebugElement } from '@angular/core';
import { AppModule } from '../app.module';

const menuService = new MenuServiceStub();
const notifierService = new NotifierServiceStub();
const wikiService = new WikiServiceStub();

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        {provide: MenuService, useValue: menuService},
        {provide: NotifierService, useValue: notifierService},
        {provide: WikiService, useValue: wikiService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  // it('should subscribe to menuServicePagePath on init', fakeAsync(() => {
  //   const spy = spyOn(menuService, 'pagePaths$');
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));

  describe('Add a new wiki page ', () => {
    it('should toggle the add page \'modal\' on add button click', () => {
      const spy = spyOn(component, 'toggleCreateModal');
      const toggleAddWikiButton = debugEl.nativeElement.querySelector('#toggle-add-modal');    

      toggleAddWikiButton.click();
      expect(spy).toHaveBeenCalled();
    })

    it('should have modal add button disabled when input is empty', () => {
      let addWikiPageButton
      component.createModalOpen = true;
      fixture.detectChanges();

      addWikiPageButton = debugEl.nativeElement.querySelector('#add-page-btn');
      expect(addWikiPageButton.disabled).toBe(true);
    });

    it('should have modal add button enabled when input is not empty', () => {
      let addWikiPageButton
      component.createModalOpen = true;
      component.inputPath.setValue('foo');
      fixture.detectChanges();

      addWikiPageButton = debugEl.nativeElement.querySelector('#add-page-btn');
      expect(addWikiPageButton.disabled).toBe(false);
    });

    it('should call createWikiPage() when input is entered and submitted', fakeAsync(() => {
      const spy = spyOn(component, 'createWikiPage');    
      let addWikiPageButton;

      component.createModalOpen = true;
      component.inputPath.setValue('foo');
      fixture.detectChanges();
      
      addWikiPageButton = debugEl.nativeElement.querySelector('#add-page-btn');
      addWikiPageButton.click();
      expect(spy).toHaveBeenCalled();
    }));

    it('should toggle off add wiki modal when cancel button is clicked ', fakeAsync(() => {
      const spy = spyOn(component, 'toggleCreateModal').and.callThrough();    
      let cancelWikiPageButton;
      component.createModalOpen = true;
      fixture.detectChanges();
      
      cancelWikiPageButton = debugEl.nativeElement.querySelector('#cancel-add-page-btn');
      cancelWikiPageButton.click();

      expect(spy).toHaveBeenCalled();
      expect(component.createModalOpen).toBeFalsy();
    }));

    it('should call createPage() from wikiService on calling createWikiPage()', fakeAsync(() => {
      const spy = spyOn(wikiService, 'createPage').and.callThrough();
      component.inputPath.setValue('foo');
      component.createWikiPage();

      expect(spy).toHaveBeenCalled();
    }));

    it('should call successfulUpdate() if wikiService.createPage() is successful', fakeAsync(() => {
      const spy = spyOn(component, 'successfulUpdate').and.callThrough();
      component.inputPath.setValue('foo');
      component.createWikiPage();

      expect(spy).toHaveBeenCalled();
    }));

    it('should call notifierService.notify() with success message when successfulUpdate() is called', fakeAsync(() => {
      const spy = spyOn(notifierService, 'notify').and.callThrough();
      component.successfulUpdate({status: 200}, '');    

      expect(spy).toHaveBeenCalledWith('success', 'Status 200: Wiki created!');
      expect(spy.calls.count()).toBe(1);
    }));

    it('should call menuService.updatePagePath() with new page path when successfulUpdate() is called', fakeAsync(() => {
      const spy = spyOn(menuService, 'updatePagePath');
      component.successfulUpdate('', 'foo');    

      expect(spy).toHaveBeenCalledWith('foo');
      expect(spy.calls.count()).toBe(1);
    }));

    it('should call notifierService.notify() with error message when unsuccessfulUpdate() is called', fakeAsync(() => {
      const spy = spyOn(notifierService, 'notify').and.callThrough();
      component.unsuccessfulUpdate({status: 400});    

      expect(spy).toHaveBeenCalledWith('error', 'Status 400: Failed to create wiki. See logs for details.');
      expect(spy.calls.count()).toBe(1);
    }));
  });

  describe('Menu toggle ', () => {
    it('should toggle menu on menu button click', () => {
      const spy = spyOn(component, 'toggleMenu');
      const toggleShowMenuButton = debugEl.nativeElement.querySelector('#show-menu');

      toggleShowMenuButton.click();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
    });

    it('should call menuService.toggleMenu() on toggleMenu() call', () => {
      const spy = spyOn(menuService, 'toggleMenu');
      component.toggleMenu();

      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
    });
  })
});
