import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facture1Component } from './facture1.component';

describe('Facture1Component', () => {
  let component: Facture1Component;
  let fixture: ComponentFixture<Facture1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Facture1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Facture1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
