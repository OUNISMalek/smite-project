import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from '../models/produit.model';
import { ApiService } from '../services/api.service';
import { ServfactureService } from '../services/servfacture.service';

@Component({
  selector: 'app-dialog-facture',
  templateUrl: './dialog-facture.component.html',
  styleUrls: ['./dialog-facture.component.scss'],
})
export class DialogFactureComponent implements OnInit {
  ligneForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.ligneForm = this.formBuilder.group({
      code: ['', Validators.required],
      service: ['', Validators.required],
      quantite: ['', Validators.required],
      prix_uni_ht: ['', Validators.required],
      prix_ht: ['', Validators.required],
      tva: ['', Validators.required],
      total: ['', Validators.required],
    });
    if (this.editData) {
      this.ligneForm.controls['code'].setValue(this.editData.code);
      this.ligneForm.controls['service'].setValue(this.editData.service);
      this.ligneForm.controls['quantite'].setValue(this.editData.quantite);
      this.ligneForm.controls['prix_uni_ht'].setValue(this.editData.prix_uni_ht);
      this.ligneForm.controls['prix_ht'].setValue(this.editData.prix_ht);
      this.ligneForm.controls['tva'].setValue(this.editData.tva);
      this.ligneForm.controls['total'].setValue(this.editData.total);
    }
  }
  //onCodeInput(val: string): Produit {
  // return this.api.lookupProduit(val);
  //}
  
}
