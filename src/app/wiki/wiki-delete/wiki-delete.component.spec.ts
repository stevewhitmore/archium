import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiDeleteComponent } from './wiki-delete.component';
import { SimpleChange, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const doomedPage = require('../../_shared/testing/test-data/page-single.json');

describe('WikiDeleteComponent', () => {
  let component: WikiDeleteComponent;
  let fixture: ComponentFixture<WikiDeleteComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiDeleteComponent ]
    });

    fixture = TestBed.createComponent(WikiDeleteComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    const changes = {pageContent: new SimpleChange(null, doomedPage, true)}
    component.ngOnChanges(changes);
    fixture.detectChanges();
  });

  describe('isolated tests', () => {
    it('should emit the page when confirmDeletion is called', () => {
      const spy = spyOn(component.deletePageEvent, 'emit');

      component.confirmDeletion();

      expect(spy).toHaveBeenCalledWith(doomedPage);
      expect(spy.calls.count()).toBe(1);
    });

    it('should emit the null when toggleDeleteOff is called', () => {
      const spy = spyOn(component.deletePageEvent, 'emit');

      component.toggleDeleteOff();

      expect(spy).toHaveBeenCalledWith(null);
      expect(spy.calls.count()).toBe(1);
    });
  });

  describe('shallow integration tests', () => {
    it('should display page title on load', () => {
      expect(debugEl.query(By.css('#delete-page-modal > p strong')).nativeElement.textContent).toBe(doomedPage.title);
    });

    it('should toggle off the delete component when clicked', () => {
      const spy = spyOn(component, 'toggleDeleteOff');
      const cancelButton = debugEl.query(By.css('#cancel-delete-page-btn'));

      cancelButton.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
    });
  });
});
