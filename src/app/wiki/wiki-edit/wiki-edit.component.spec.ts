import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { WikiEditComponent } from './wiki-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

const mockPage = require('../../_shared/testing/test-data/page-single.json');

fdescribe('WikiEditComponent', () => {
  let component: WikiEditComponent;
  let fixture: ComponentFixture<WikiEditComponent>;

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
  });
});
