import { TestBed } from '@angular/core/testing';

import { ServchargeService } from './servcharge.service';

describe('ServchargeService', () => {
  let service: ServchargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServchargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
