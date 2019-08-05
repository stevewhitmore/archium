import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiAddComponent } from './wiki-add.component';

describe('WikiAddComponent', () => {
  let component: WikiAddComponent;
  let fixture: ComponentFixture<WikiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
