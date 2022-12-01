import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge3DialogComponent } from './charge3-dialog.component';

describe('Charge3DialogComponent', () => {
  let component: Charge3DialogComponent;
  let fixture: ComponentFixture<Charge3DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge3DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge3DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
