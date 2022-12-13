import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge3Component } from './charge3.component';

describe('Charge3Component', () => {
  let component: Charge3Component;
  let fixture: ComponentFixture<Charge3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
