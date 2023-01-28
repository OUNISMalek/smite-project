import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { DialogFournisseurComponent } from '../dialog-fournisseur/dialog-fournisseur.component';
import { FournisseurReq, FournisseurRes } from '../models/fournisseur.model';
import { FournisseurService } from '../services/fournisseur.service';
import { AppDataState, DataStateEnum } from '../state/data.model';

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
        console.log(req);
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
    deleteDialog.afterClosed().subscribe((req: FournisseurRes) => {
      console.log(req);
      this.api.deleteFournisseurById(req.id).subscribe((res) => {
        console.log(res);
        return res;
      });
    });
  }
}
