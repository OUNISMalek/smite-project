import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charge2DialogComponent } from './charge2-dialog.component';

describe('Charge2DialogComponent', () => {
  let component: Charge2DialogComponent;
  let fixture: ComponentFixture<Charge2DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Charge2DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charge2DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
