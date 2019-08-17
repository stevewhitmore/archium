import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiDeleteComponent } from './wiki-delete.component';

describe('WikiDeleteComponent', () => {
  let component: WikiDeleteComponent;
  let fixture: ComponentFixture<WikiDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
