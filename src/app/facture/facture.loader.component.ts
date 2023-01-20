import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { InitialFactureDialogComponent } from '../initial.facture.dialog/initial.facture.dialog.component';
import { FactureReq, FactureRes, NewFactData } from '../models/facture.model';
import { ServfactureService } from '../services/servfacture.service';
import { AppContext, AppDataState, DataStateEnum } from '../state/data.model';
import { DataStateService } from '../state/datastate.service';

@Component({
  selector: 'app-facture-loader',
  templateUrl: './facture.loader.component.html',
  styleUrls: ['./facture.loader.component.scss'],
})
export class FactureLoaderComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  loading: boolean = true;
  requestNewFacture?: NewFactData;
  facture!: FactureReq;
  factures$!: Observable<AppDataState<FactureRes[]>>;

  constructor(
    private servfacture: ServfactureService,
    private dialog: MatDialog,
    private router: Router,
    private dataService: DataStateService
  ) {}

  ngOnInit(): void {
    this.getAllFactures();
  }
  getAllFactures() {
    this.factures$ = this.servfacture.getAllFacture().pipe(
      map((data) => {
        this.loading = false;
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((e) => {
        return of({ dataState: DataStateEnum.ERROR, errorMessage: e.message });
      })
    );
  }
  newFacture() {
    const dialogRef = this.dialog.open(InitialFactureDialogComponent);
    dialogRef.afterClosed().pipe(
      map((res) => {
        this.requestNewFacture = res;
        this.loadNewFacture();
        this.router.navigateByUrl('/facture');
      })
    );
  }

  loadNewFacture() {
    return this.dataService.publishEvent({
      appContext: AppContext.NEWFACTURE,
      payload: this.requestNewFacture,
    });
  }
  // loadFactureByNumber(s: string) {
  //   let n = Number(s);
  //   this.factures$ = this.servfacture.getFacture(n);
  //   this.loading = true;
  // }
  // saveFacture(uploadedFacture: string) {
  //   // let facture = new Facture();
  //   // Object.assign(facture, uploadedFacture);
  //   this.servfacture
  //     .saveFacture(uploadedFacture)
  //     .subscribe({ complete: () => alert('Facture sauvegardée') });
  // }
}
