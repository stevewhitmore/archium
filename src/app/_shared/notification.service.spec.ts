import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { NotificationService } from './notification.service';
import { ToastaService } from 'ngx-toasta';
import { ToastaServiceStub } from './testing/stubs/toasta-service.stub';

const toastaServiceStub = new ToastaServiceStub();

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotificationService,
        { provide: ToastaService, useValue: toastaServiceStub }
      ]
    });

    notificationService = TestBed.get(NotificationService);
    httpTestingController = TestBed.get(HttpTestingController);
  })

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should call toastaService.success if notificationType is "success"', () => {
    const spy = spyOn(toastaServiceStub, 'success');

    notificationService.notify('success', 'you did it!');

    expect(spy).toHaveBeenCalled();
  });

  it('should call toastaService.error if notificationType is anything other than "success"', () => {
    const spy = spyOn(toastaServiceStub, 'error');

    notificationService.notify('flurgen', 'ruh roh!');

    expect(spy).toHaveBeenCalled();
  });
});
