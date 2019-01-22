import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
  });

  it('should be dateCreated', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
