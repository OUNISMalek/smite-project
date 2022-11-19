import { TestBed } from '@angular/core/testing';

import { ServfactureService } from './servfacture.service';

describe('ServfactureService', () => {
  let service: ServfactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServfactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
