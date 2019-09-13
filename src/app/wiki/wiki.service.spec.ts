import { TestBed } from '@angular/core/testing';

import { WikiService } from './wiki.service';

fdescribe('WikiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WikiService = TestBed.get(WikiService);
    expect(service).toBeTruthy();
  });
});
