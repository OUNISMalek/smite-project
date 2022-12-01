import { TestBed } from '@angular/core/testing';

import { Servch2Service } from '../services/servch2.service';

describe('Servch2Service', () => {
  let service: Servch2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servch2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
