import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge1Component } from './charge1.component';

describe('Charge1Component', () => {
  let component: Charge1Component;
  let fixture: ComponentFixture<Charge1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
