import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge4Component } from './charge4.component';

describe('Charge4Component', () => {
  let component: Charge4Component;
  let fixture: ComponentFixture<Charge4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
