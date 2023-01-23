import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
})
export class DialogProductComponent implements OnInit {
  actionBtn: string = 'OK';
  productForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true}],
      ref: ['', Validators.required],
      nom: ['', Validators.required],
      quantite: ['', Validators.required],
      prix: ['', Validators.required],
      tauxTva: ['', Validators.required],
      image: [''],
      idFournisseur: ['', Validators.required],
    });
    if (this.dialogData) {
      if (this.dialogData.action1 === 'update') {
        this.actionBtn = 'Mettre à jour';
        this.productForm.patchValue({
          id: this.dialogData.form.id,
          ref: this.dialogData.form.ref,
          nom: this.dialogData.form.nom,
          quantite: this.dialogData.form.quantite,
          prix: this.dialogData.form.prix,
          tauxTva: this.dialogData.form.tauxTva,
          image: this.dialogData.form.image,
          idFournisseur: this.dialogData.form.idFournisseur,
        });
        this.productForm.controls['id'].disable();
      }
      if (this.dialogData.action1 === 'delete') {
        this.actionBtn = 'Supprimer';
        this.productForm.patchValue({
          id: this.dialogData.form.id,
          ref: this.dialogData.form.ref,
          nom: this.dialogData.form.nom,
          quantite: this.dialogData.form.quantite,
          prix: this.dialogData.form.prix,
          tauxTva: this.dialogData.form.tauxTva,
          image: this.dialogData.form.image,
          idFournisseur: this.dialogData.form.idFournisseur,
        });
        this.productForm.controls['id'].disable();
        this.productForm.controls['ref'].disable();
        this.productForm.controls['nom'].disable();
        this.productForm.controls['quantite'].disable();
        this.productForm.controls['prix'].disable();
        this.productForm.controls['tauxTva'].disable();
        // this.productForm.controls['image'].disable(); // not disabling this control so the form stays valid ¯\_(ツ)_/¯
        this.productForm.controls['idFournisseur'].disable();
      }
    }
    console.log(this.productForm.valid);
    console.log(this.dialogData);
  }
}
