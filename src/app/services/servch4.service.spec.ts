import { TestBed } from '@angular/core/testing';

import { Servch4Service } from '../services/servch4.service';

describe('Servch4Service', () => {
  let service: Servch4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servch4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
