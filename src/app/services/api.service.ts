import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  host = environment.backEndHost;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  addProduct(data: Produit): Observable<Produit> {
    return this.http.post<Produit>(
      this.host + '/produit',
      data,
      this.httpOptions
    );
  }
  getAllProduct(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.host + '/produit', this.httpOptions);
  }
  updateProduct(data: Produit, id: number): Observable<Produit> {
    return this.http.put<Produit>(
      this.host + '/produit/update/' + id,
      data,
      this.httpOptions
    );
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.post<number>(
      this.host + '/produit/delete/' + id,
      null,
      this.httpOptions
    );
  }
  getProductById(id: number): Observable<Produit> {
    return this.http.get<Produit>(
      this.host + '/produit/' + id,
      this.httpOptions
    );
  }
  getProductQuantityById(id: number): Observable<number> {
    return this.http.get<number>(
      this.host + '/produit/quantity/' + id,
      this.httpOptions
    );
  }
}
