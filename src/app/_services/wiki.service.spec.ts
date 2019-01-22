import { TestBed, inject } from '@angular/core/testing';

import { WikiService } from './wiki.service';

describe('WikiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikiService]
    });
  });

  it('should be dateCreated', inject([WikiService], (service: WikiService) => {
    expect(service).toBeTruthy();
  }));
});
