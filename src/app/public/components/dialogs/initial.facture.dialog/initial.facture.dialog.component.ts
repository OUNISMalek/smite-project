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
import { ClientRes } from 'src/app/models/client.model';
import { TypeFacture, NewFactData } from 'src/app/models/facture.model';
import { ClientService } from 'src/app/shared/services/client.service';
import {FournisseurRes} from "../../../../models/fournisseur.model";
import {FournisseurService} from "../../../../shared/services/fournisseur.service";

@Component({
  selector: 'app-initial.facture.dialog',
  templateUrl: './initial.facture.dialog.component.html',
  styleUrls: ['./initial.facture.dialog.component.scss'],
})
export class InitialFactureDialogComponent implements OnInit {
  newFactureForm!: FormGroup;
  TypeFacture: typeof TypeFacture = TypeFacture;
  filteredClients$!: Observable<ClientRes[]>;
  filteredFournisseurs$!: Observable<FournisseurRes[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewFactData,
    public dialogRef: MatDialogRef<InitialFactureDialogComponent>,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private clientApi: ClientService,
    private FournisseurApi: FournisseurService
  ) {}

  ngOnInit(): void {
    this.newFactureForm = this.fb.group({
      codeFacture: ['', Validators.required],
      dateFacture: [null, Validators.required],
      typeFacture: [null, Validators.required],
      idClient: ['', Validators.required],
    });
    this.filteredClients$ = this.newFactureForm.controls[
      'idClient'
    ].valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this._filter(val || '');
      })
    );
    this.filteredFournisseurs$ = this.newFactureForm.controls[
      'idClient'
      ].valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this._filterFournisseur(val || '');
      })
    );
  }

  private _filter(keyword: string): Observable<ClientRes[]> {
    return this.clientApi.getAllClient().pipe(
      map((res) =>
        res.filter((opt) => {
          return opt.nom.toLowerCase().includes(keyword);
        })
      )
    );
  }
  private _filterFournisseur(keyword: string): Observable<FournisseurRes[]> {
    return this.FournisseurApi.getAllFournisseur().pipe(
      map((res) =>
        res.filter((opt) => {
          return opt.nom.toLowerCase().includes(keyword);
        })
      )
    );
  }

  onSubmit() {
    if (this.newFactureForm.valid) {
      this.dialogRef.close(this.newFactureForm.value);
    } else {
      this.snack.open('Entree non valide!', 'OK', { duration: 1000 });
    }
  }
}
