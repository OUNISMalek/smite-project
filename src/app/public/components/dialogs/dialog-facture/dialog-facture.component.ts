import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import {Produit} from 'src/app/models/produit.model';
import {ApiService} from 'src/app/shared/services/api.service';

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
  ) {
  }

  ngOnInit(): void {
    this.ligneForm = this.formBuilder.group({
      code: ['', Validators.required],
      service: ['', Validators.required],
      quantite: [null, Validators.required],
      prix_uni_ht: [null, Validators.required],
      prix_ht: ['', Validators.required],
      tva: ['', Validators.required],
      total: ['', Validators.required],
    });
    if (this.editData) {
      this.setForm(this.editData);
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
  updateForm(p:Produit){
    this.ligneForm.controls['code'].setValue(p.ref);
    this.ligneForm.controls['service'].setValue(p.nom);
    this.ligneForm.controls['quantite'].setValue(p.quantite);
    this.ligneForm.controls['prix_uni_ht'].setValue(p.prix);
    this.ligneForm.controls['tva'].setValue(p.tauxTva);
    this.ligneForm.controls['prix_ht'].setValue(this.getPrixTotale());
    this.ligneForm.controls['total'].setValue(this.getPrixTtc());
  }

  setForm(p: any) {
    this.ligneForm.controls['code'].setValue(p.code);
    this.ligneForm.controls['service'].setValue(p.service);
    this.ligneForm.controls['quantite'].setValue(p.quantite);
    this.ligneForm.controls['prix_uni_ht'].setValue(
      p.prix_uni_ht
    );
    this.ligneForm.controls['prix_ht'].setValue(p.prix_ht);
    this.ligneForm.controls['tva'].setValue(p.tva);
    this.ligneForm.controls['total'].setValue(p.total);
  }
  getPrix(){
    return this.ligneForm.controls['prix_uni_ht'].value;
  }
  getQuantite(){
    return this.ligneForm.controls['quantite'].value;
  }
  getPrixTotale(){
    return Number(this.getPrix()) * Number(this.getQuantite());
  }
  getTva(){
    return this.ligneForm.controls['tva'].value;
  }
  getPrixTtc(){
    return this.getPrixTotale() + (Number(this.getTva()) * this.getPrixTotale() / 100);
  }

  onSubmit() {
    if (this.ligneForm.valid) {
      this.dialogRef.close(this.ligneForm.value);
    } else {
      this.snack.open('Entree invalide!', 'OK', {duration: 1000});
    }
  }
}
