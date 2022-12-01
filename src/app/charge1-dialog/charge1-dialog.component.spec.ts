import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge1DialogComponent } from './charge1-dialog.component';

describe('Charge1DialogComponent', () => {
  let component: Charge1DialogComponent;
  let fixture: ComponentFixture<Charge1DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge1DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge1DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
