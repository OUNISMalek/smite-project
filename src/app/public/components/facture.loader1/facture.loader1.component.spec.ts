import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureLoader1Component } from './facture.loader1.component';

describe('FactureLoader1Component', () => {
  let component: FactureLoader1Component;
  let fixture: ComponentFixture<FactureLoader1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureLoader1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureLoader1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
