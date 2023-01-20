import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { Produit } from '../models/produit.model';
import { ApiService } from '../services/api.service';
import { AppDataState, DataStateEnum } from '../state/data.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  produits$!: Observable<AppDataState<Produit[]>>;
  loading: boolean = true;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.produits$ = this.api.getAllProduct().pipe(
      map((data) => {
        this.loading = false;
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((e) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: e.message })
      )
    );
  }
  addProduct() {
    const dialogRef = this.dialog.open(DialogProductComponent);
    dialogRef.afterClosed().pipe(
      map((req) => {
        console.log(req);
        // this.api.addProduct(req).pipe(map((res) => console.log(res)));
      })
    );
  }
  removeProduct() {
    const dialogRef = this.dialog.open(DialogProductComponent);
    dialogRef.afterClosed().pipe(
      map((req) => {
        console.log(req);
        //this.api.deleteProductById(req.id).pipe(map((res) => console.log(res)));
      }),
      startWith(console.log('loading')),
      catchError((e) => of('error'))
    );
  }
}
