import { Component, Input, DebugElement, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WikiViewComponent } from './wiki-view.component';
import { WikiService } from '../wiki.service';
import { WikiServiceStub } from '../../_shared/testing/stubs';

const wikiServiceStub = new WikiServiceStub();
const mockContent = require('../../_shared/testing/test-data/page-single.json');

@Component({
  selector: 'app-tags',
  template: '<div></div>'
})
export class FakeTagsComponent {
  @Input() pageId: any;
}

export function MockDirective(options: Component): Directive {
  const metadata: Directive = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs
  };
  return <any>Directive(metadata)(class _ {}); // <----- add <any>
}

describe('WikiViewComponent', () => {
  let component: WikiViewComponent;
  let fixture: ComponentFixture<WikiViewComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WikiViewComponent,
        FakeTagsComponent,
        MockDirective({
          selector: '[markdown]',
          inputs: [ 'data' ]  // <--- empty, unless the directive has inputs
        })
      ],
      providers: [
        { provide: WikiService, useValue: wikiServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiViewComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    component.pageContent = mockContent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
