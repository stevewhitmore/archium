import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Output, Input, DebugElement, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WikiComponent } from './wiki.component';
import { ActivatedRouteStub, RouterStub } from '../_shared/testing/stubs/router.stubs';
import { NotificationService } from '../_shared/notification.service';
import { WikiService } from './wiki.service';
import { WikiServiceStub } from '../_shared/testing/stubs/wiki-service.stub';
import { NotificationServiceStub } from '../_shared/testing/stubs/notification-service.stub';
import { WikiModule } from './wiki.module';

const activatedRouteStub = new ActivatedRouteStub();
const routerStub = new RouterStub();
const wikiServiceStub = new WikiServiceStub();
const notificationServiceStub = new NotificationServiceStub();

@Component({
  selector: 'app-wiki-menu',
  template: '<div></div>'
})
export class FakeWikiMenuComponent {
  @Output() toggleEditEvent: EventEmitter<any> = new EventEmitter();
}
@Component({
  selector: 'app-wiki-view',
  template: '<div></div>'
})
export class FakeWikiViewComponent {
  @Input() pageContent: any;
}
@Component({
  selector: 'app-wiki-edit',
  template: '<div></div>'
})
export class FakeWikiEditComponent {
  @Input() pageContent: any;
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
}
@Component({
  selector: 'app-wiki-add',
  template: '<div></div>'
})
export class FakeWikiAddComponent {
  @Output() createPageEvent: EventEmitter<any> = new EventEmitter();
}
@Component({
  selector: 'app-wiki-delete',
  template: '<div></div>'
})
export class FakeWikiDeleteComponent {
  @Input() pageContent: any;
  @Output() deletePageEvent: EventEmitter<any> = new EventEmitter();
}

describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WikiComponent,
        FakeWikiMenuComponent,
        FakeWikiViewComponent,
        FakeWikiEditComponent,
        FakeWikiAddComponent,
        FakeWikiDeleteComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: Router, useValue: routerStub},
        {provide: WikiService, useValue: wikiServiceStub},
        {provide: NotificationService, useValue: notificationServiceStub}
      ]
    })

    fixture = TestBed.createComponent(WikiComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
