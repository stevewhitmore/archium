import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, DebugElement } from '@angular/core';

import { WikiEditComponent } from './wiki-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

const mockPage = require('../../_shared/testing/test-data/page-single.json');

describe('WikiEditComponent', () => {
  let component: WikiEditComponent;
  let fixture: ComponentFixture<WikiEditComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ WikiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEditComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    const changes = { pageContent: new SimpleChange(null, mockPage, true) }
    component.ngOnChanges(changes);
    fixture.detectChanges();
  });

  describe('isolated tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit object with form values when saveEdit() is called', () => {
      const spy = spyOn(component.editEvent, 'emit');
      const updatedPageObject = Object.assign({}, mockPage, { title: 'foo' })
      component.wikiEditForm.controls.title.setValue('foo');

      component.saveEdit();

      expect(spy).toHaveBeenCalledWith(updatedPageObject);
    });

    it('should emit null if cancelEdit() is called', () => {
      const spy = spyOn(component.editEvent, 'emit');

      component.cancelEdit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it(`should update the "path" formControl to match the title but lowercase, no spaces
        and only alpha-numeric characters`, () => {
      component.wikiEditForm.controls.title.setValue('How To Be Awesome!!!11');
      const title = component.wikiEditForm.controls.title.value;
      const expectedPath = title.replace(/[^a-z0-9+]+/gi, '-').toLowerCase();

      component.pathMatchTitle();

      expect(component.wikiEditForm.controls.path.value).toEqual(expectedPath);
    });
  }); //isolated tests

  describe('shallow integration tests', () => {
    it('should be disabled if title formControl is empty', () => {
      const saveButton = debugEl.query(By.css('#save-edit'));

      component.wikiEditForm.controls.title.setValue('');
      component.wikiEditForm.controls.path.setValue('some-path');
      component.wikiEditForm.controls.content.setValue('some content');
      fixture.detectChanges();

      expect(saveButton.nativeElement.disabled).toBe(true);
    });

    it('should be disabled if path formControl is empty', () => {
      const saveButton = debugEl.query(By.css('#save-edit'));

      component.wikiEditForm.controls.title.setValue('Some Path');
      component.wikiEditForm.controls.path.setValue('');
      component.wikiEditForm.controls.content.setValue('some content');
      fixture.detectChanges();

      expect(saveButton.nativeElement.disabled).toBe(true);
    });

    it('should be enabled if title and path formControls are populated', () => {
      const saveButton = debugEl.query(By.css('#save-edit'));

      component.wikiEditForm.controls.title.setValue('Some Path');
      component.wikiEditForm.controls.path.setValue('some-path');
      component.wikiEditForm.controls.content.setValue('some content');
      fixture.detectChanges();

      expect(saveButton.nativeElement.disabled).toBe(false);
    });

    it('should trigger saveEdit() when clicked', () => {
      const spy = spyOn(component, 'saveEdit');
      const saveButton = debugEl.query(By.css('#save-edit'));
      component.wikiEditForm.controls.title.setValue('Some Path');
      component.wikiEditForm.controls.path.setValue('some-path');
      component.wikiEditForm.controls.content.setValue('some content');
      fixture.detectChanges();

      saveButton.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should trigger cancelEdit() when clicked', () => {
      const spy = spyOn(component, 'cancelEdit');
      const cancelButton = debugEl.query(By.css('#cancel-edit'));

      cancelButton.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  }); //shallow integration tests
});
