import { TestBed } from '@angular/core/testing';

import { Servch1Service } from '../services/servch1.service';

describe('Servch1Service', () => {
  let service: Servch1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servch1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
