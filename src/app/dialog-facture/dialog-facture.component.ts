import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServfactureService } from '../services/servfacture.service';

@Component({
  selector: 'app-dialog-facture',
  templateUrl: './dialog-facture.component.html',
  styleUrls: ['./dialog-facture.component.scss'],
})
export class DialogFactureComponent implements OnInit {
  FactureForm!: FormGroup;
  actionBtn: String = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private servfacture: ServfactureService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogFactureComponent>
  ) {}

  ngOnInit(): void {
    this.FactureForm = this.formBuilder.group({
      code: ['', Validators.required],
      service: ['', Validators.required],
      quantite: ['', Validators.required],
      prix_uni_ht: ['', Validators.required],
      prix_ht: ['', Validators.required],
      tva: ['', Validators.required],
      total: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.FactureForm.controls['code'].setValue(this.editData.date);
      this.FactureForm.controls['service'].setValue(this.editData.montant);
      this.FactureForm.controls['quantite'].setValue(this.editData.charge);
      this.FactureForm.controls['prix_uni_ht'].setValue(this.editData.charge);
      this.FactureForm.controls['prix_ht'].setValue(this.editData.charge);
      this.FactureForm.controls['tva'].setValue(this.editData.charge);
      this.FactureForm.controls['total'].setValue(this.editData.charge);
    }
  }
  addLigneFacture() {
    if (!this.editData) {
      if (this.FactureForm.valid) {
        this.servfacture.postLigneFacture(this.FactureForm.value).subscribe({
          next: (res) => {
            alert('OrderLine added successfully');
            this.FactureForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding orderLine');
          },
        });
      }
    } else {
      this.updateFacture();
    }
  }
  updateFacture() {
    this.servfacture
      .putLigneFacture(this.FactureForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Facture updated successfully');
          this.FactureForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Error while updating !');
        },
      });
  }
}
