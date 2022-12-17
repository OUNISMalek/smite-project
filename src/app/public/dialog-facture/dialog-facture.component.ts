import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServfactureService } from '../../services/servfacture.service';

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
  ) { }

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
      this.FactureForm.controls['code'].setValue(this.editData.code);
      this.FactureForm.controls['service'].setValue(this.editData.service);
      this.FactureForm.controls['quantite'].setValue(this.editData.quantite);
      this.FactureForm.controls['prix_uni_ht'].setValue(this.editData.prix_uni_ht);
      this.FactureForm.controls['prix_ht'].setValue(this.editData.prix_ht);
      this.FactureForm.controls['tva'].setValue(this.editData.tva);
      this.FactureForm.controls['total'].setValue(this.editData.total);
    }
  }
  // addLigneFacture() {
  //   if (!this.editData) {
  //     if (this.FactureForm.valid) {
  //       this.servfacture.postLigneFacture(this.FactureForm.value).subscribe({
  //         next: (res) => {
  //           this.FactureForm.reset();
  //           this.dialogRef.close('saved');
  //         },
  //         error: () => {
  //           alert('Error while adding orderLine');
  //         },
  //       });
  //     }
  //   } else {
  //     this.updateFacture();
  //   }
  // }
  // updateFacture() {
  //   this.servfacture
  //     .putLigneFacture(this.FactureForm.value, this.editData.id)
  //     .subscribe({
  //       next: (res) => {
  //         this.FactureForm.reset();
  //         this.dialogRef.close('updated');
  //       },
  //       error: () => {
  //         alert('Error while updating !');
  //       },
  //     });
  // }
}
