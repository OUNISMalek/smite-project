import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  host = environment.backEndHost;

  addProduct(data: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.host + '/produit/', data);
  }
  getAllProduct(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.host + '/produit/');
  }
  updateProduct(data: Produit, id: number): Observable<Produit> {
    return this.http.post<Produit>(this.host + '/produit/update/' + id, data);
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.post<number>(this.host + '/produit/delete/' + id, null);
  }
  getProductById(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.host + '/produit/' + id);
  }
  getProductQuantityById(id: number): Observable<number> {
    return this.http.get<number>(this.host + '/produit/quantity/' + id);
  }
}
