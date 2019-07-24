import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiComponent } from './wiki.component';
import { Component } from '@angular/core';

@Component({
  "selector": "app-wiki-menu",
  "template": "<div></div>"
})
export class FakeWikiMenuComponent {}

describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiComponent, FakeWikiMenuComponent ]
    })

    fixture = TestBed.createComponent(WikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
