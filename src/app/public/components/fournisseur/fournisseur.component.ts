import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { FournisseurRes, FournisseurReq } from 'src/app/models/fournisseur.model';
import { FournisseurService } from 'src/app/shared/services/fournisseur.service';
import { AppDataState, DataStateEnum } from 'src/app/shared/state/data.model';
import { DialogFournisseurComponent } from '../dialogs/dialog-fournisseur/dialog-fournisseur.component';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  fournisseurs$!: Observable<AppDataState<FournisseurRes[]>>;
  DataStateEnum: typeof DataStateEnum = DataStateEnum;

  constructor(private api: FournisseurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.fournisseurs$ = this.api.getAllFournisseur().pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((e) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: e.message })
      )
    );
  }
  addFournisseur() {
    const dialogRef = this.dialog.open(DialogFournisseurComponent);
    dialogRef.afterClosed().subscribe((req: FournisseurReq) => {
      if (req) {
        this.api.addFournisseur(req).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }
  deleteFournisseur(fr: FournisseurRes) {
    const deleteDialog = this.dialog.open(DialogFournisseurComponent, {
      data: { action: 'delete', form: fr },
    });
    deleteDialog.afterClosed().subscribe((req) => {
      if (req === 'deleted') {
        this.api.deleteFournisseurById(fr.id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }
  updateFournisseur(fr: FournisseurRes) {
    const updateDialog = this.dialog.open(DialogFournisseurComponent, {
      data: { action: 'update', form: fr },
    });
    updateDialog.afterClosed().subscribe((req: FournisseurRes) => {
      if (req) {
        this.api.updateFournisseur(req, fr.id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }
}
