import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { NotificationService } from './notification.service';
import { ToastaService } from 'ngx-toasta';
import { ToastaServiceStub } from './testing/toasta-service.stub';

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
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
