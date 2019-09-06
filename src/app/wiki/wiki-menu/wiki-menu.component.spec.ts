import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiMenuComponent } from './wiki-menu.component';

describe('WikiMenuComponent', () => {
  let component: WikiMenuComponent;
  let fixture: ComponentFixture<WikiMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiMenuComponent ]
    })

    fixture = TestBed.createComponent(WikiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
