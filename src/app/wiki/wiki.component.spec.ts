import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Output, Input, DebugElement } from '@angular/core';
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

describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;
  let debugEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WikiModule],
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
