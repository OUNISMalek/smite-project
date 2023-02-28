import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { Produit } from 'src/app/models/produit.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-dialog-facture',
  templateUrl: './dialog-facture.component.html',
  styleUrls: ['./dialog-facture.component.scss'],
})
export class DialogFactureComponent implements OnInit {
  ligneForm!: FormGroup;
  filteredProducts$!: Observable<Produit[]>;
  constructor(
    private formBuilder: FormBuilder,
    private produitApi: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogFactureComponent>,
    private snack: MatSnackBar
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
      this.ligneForm.controls['prix_uni_ht'].setValue(
        this.editData.prix_uni_ht
      );
      this.ligneForm.controls['prix_ht'].setValue(this.editData.prix_ht);
      this.ligneForm.controls['tva'].setValue(this.editData.tva);
      this.ligneForm.controls['total'].setValue(this.editData.total);
    }

    this.filteredProducts$ = this.ligneForm.controls['code'].valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this._filter(val || '');
      })
    );
  }

  private _filter(keyword: string): Observable<Produit[]> {
    return this.produitApi.getAllProduct().pipe(
      map((res) =>
        res.filter((opt) => {
          return opt.nom.toLowerCase().includes(keyword);
        })
      )
    );
  }
  onSubmit() {
    if (this.ligneForm.valid) {
      this.dialogRef.close(this.ligneForm.value);
    } else {
      this.snack.open('Entree invalide!', 'OK', { duration: 1000 });
    }
  }
}
