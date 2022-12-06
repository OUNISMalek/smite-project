import { TestBed } from '@angular/core/testing';

import { Servch3Service } from '../services/servch3.service';

describe('Servch3Service', () => {
  let service: Servch3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servch3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
