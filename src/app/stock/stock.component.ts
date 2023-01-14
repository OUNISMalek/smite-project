import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { catchError, map, Observable, of, startWith } from 'rxjs';
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

  constructor(private api: ApiService) {}

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
}
