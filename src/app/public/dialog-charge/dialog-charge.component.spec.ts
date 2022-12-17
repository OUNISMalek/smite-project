import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChargeComponent } from './dialog-charge.component';

describe('DialogChargeComponent', () => {
  let component: DialogChargeComponent;
  let fixture: ComponentFixture<DialogChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
