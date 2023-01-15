import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewFactData } from '../models/facture.model';


@Component({
  selector: 'app-initial.facture.dialog',
  templateUrl: './initial.facture.dialog.component.html',
  styleUrls: ['./initial.facture.dialog.component.scss'],
})
export class InitialFactureDialogComponent implements OnInit {
  newFactureForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewFactData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newFactureForm = this.fb.group({
      codeFacture: ['', Validators.required],
      dateFacture: ['', Validators.required],
      typeFacture: ['', Validators.required],
      idClient: ['', Validators.required],
    });
  }
}
