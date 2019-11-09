import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiAddComponent } from './wiki-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('WikiAddComponent', () => {
  let component: WikiAddComponent;
  let fixture: ComponentFixture<WikiAddComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ WikiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiAddComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('isolated tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit the pageTitle formControl value', () => {
      const spy = spyOn(component.createPageEvent, 'emit');
      const pageTitle = 'Some Page Title';
      component.pageTitle.setValue(pageTitle);

      component.createWikiPage();

      expect(spy).toHaveBeenCalledWith(pageTitle);
    });

    it('should emit null if toggleCreateModal() is called', () => {
      const spy = spyOn(component.createPageEvent, 'emit');

      component.toggleCreateModal();

      expect(spy).toHaveBeenCalledWith(null);
    });
  }); //isolated tests

  describe('shallow integration tests', () => {
    it('should trigger toggleCreateModal() when clicked', () => {
      const spy = spyOn(component, 'toggleCreateModal');
      const cancelButton = debugEl.query(By.css('#cancel-add-page-btn'));

      cancelButton.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should disable the add button if no value is entered into formControl', () => {
      const addButton = debugEl.query(By.css('#add-page-btn'));

      component.pageTitle.setValue('');
      fixture.detectChanges();

      expect(addButton.nativeElement.disabled).toBe(true);
    });

    it('should enable the add button if a value is entered into formControl', () => {
      const addButton = debugEl.query(By.css('#add-page-btn'));

      component.pageTitle.setValue('a');
      fixture.detectChanges();

      expect(addButton.nativeElement.disabled).toBe(false);
    });

    it('should trigger createWikiPage() when clicked', () => {
      const spy = spyOn(component, 'createWikiPage');
      const addButton = debugEl.query(By.css('#add-page-btn'));
      component.pageTitle.setValue('a');
      fixture.detectChanges();

      addButton.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  }); //shallow integration tests
});
