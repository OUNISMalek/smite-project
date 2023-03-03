import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatAccordion} from '@angular/material/expansion';
import {catchError, map, Observable, of, shareReplay, startWith, switchMap, take, takeUntil} from 'rxjs';
import {Produit} from 'src/app/models/produit.model';
import {ApiService} from 'src/app/shared/services/api.service';
import {AppDataState, DataStateEnum} from 'src/app/shared/state/data.model';
import {DialogProductComponent} from '../dialogs/dialog-product/dialog-product.component';
import {FournisseurService} from "../../../shared/services/fournisseur.service";
import {FournisseurRes} from "../../../models/fournisseur.model";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  produits$!: Observable<AppDataState<Produit[]>>;
  DataStateEnum: typeof DataStateEnum = DataStateEnum;
  fournisseurs$!: Observable<FournisseurRes[]>;

  constructor(private api: ApiService, private dialog: MatDialog, private fournisseurApi: FournisseurService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.produits$ = this.api.getAllProduct().pipe(
      map((data) => {
        return {dataState: DataStateEnum.LOADED, data: data};
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError((e) =>
        of({dataState: DataStateEnum.ERROR, errorMessage: e.message})
      ),

    );
    this.fournisseurs$ = this.fournisseurApi.getAllFournisseur().pipe();
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
      data: {action: 'delete', form: product},
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
      data: {action: 'update', form: product},
    });
    editDialog.afterClosed().subscribe((req: Produit) => {
      if (req) {
        this.api.updateProduct(req, req.id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }

  getFournisseurById(id:number): Observable<string> {
    return this.fournisseurs$.pipe(map(f=>f[id].nom));
  }
}
