import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFactureDialogComponent } from './initial.facture.dialog.component';

describe('InitialFactureDialogComponent', () => {
  let component: InitialFactureDialogComponent;
  let fixture: ComponentFixture<InitialFactureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialFactureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialFactureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
