import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge4DialogComponent } from './charge4-dialog.component';

describe('Charge4DialogComponent', () => {
  let component: Charge4DialogComponent;
  let fixture: ComponentFixture<Charge4DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge4DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge4DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
