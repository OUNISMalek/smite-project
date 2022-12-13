import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge2Component } from './charge2.component';

describe('Charge2Component', () => {
  let component: Charge2Component;
  let fixture: ComponentFixture<Charge2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
