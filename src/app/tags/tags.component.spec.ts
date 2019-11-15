import { Component, Input, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsComponent } from './tags.component';

import { TagsService } from './tags.service';
import { AuthenticationService } from '../_shared/security/authentication.service';
import { NotificationService } from '../_shared/notification.service';

import {
  TagsServiceStub,
  AuthenticationServiceStub,
  NotificationServiceStub
} from '../_shared/testing/stubs';

const tagsServiceStub = new TagsServiceStub();
const authenticationServiceStub = new AuthenticationServiceStub();
const notificationServiceStub = new NotificationServiceStub();

@Component({
  selector: 'app-tags-view',
  template: '<div></div>'
})
export class FakeTagsViewComponent {
  @Input() pageTags: any;
}
@Component({
  selector: 'app-tags-update',
  template: '<div></div>'
})
export class FakeTagsUpdateComponent {
  @Input() pageTags: any;
  @Input() allTags: any;
  @Output() updateTagsEvent: EventEmitter<any> = new EventEmitter();
}

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagsComponent,
        FakeTagsViewComponent,
        FakeTagsUpdateComponent
      ],
      providers: [
        { provide: TagsService, useValue: tagsServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
