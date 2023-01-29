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
  DataStateEnum: typeof DataStateEnum = DataStateEnum;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.produits$ = this.api.getAllProduct().pipe(
      map((data) => {
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
    dialogRef.afterClosed().subscribe((req: Produit) => {
      if (req) {
        this.api.addProduct(req).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }
  deleteProduct(product: Produit) {
    const deleteDialog = this.dialog.open(DialogProductComponent, {
      data: { action: 'delete', form: product },
    });
    deleteDialog.afterClosed().subscribe((req) => {
      if (req === 'deleted') {
        this.api.deleteProductById(product.id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }
  editProduct(product: Produit) {
    const editDialog = this.dialog.open(DialogProductComponent, {
      data: { action: 'update', form: product },
    });
    editDialog.afterClosed().subscribe((req: Produit) => {
      if (req) {
        this.api.updateProduct(req, req.id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }
}
