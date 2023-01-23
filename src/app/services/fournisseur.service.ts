import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  constructor(private http: HttpClient) {}

  host = environment.backEndHost;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  addFournisseur(data: any) {
    return this.http.post<any>(
      this.host + '/fournisseur',
      data,
      this.httpOptions
    );
  }
  getAllFournisseur() {
    return this.http.get<any>(this.host + '/fournisseur', this.httpOptions);
  }
  updateFournisseur(data: any, id: number) {
    return this.http.post<any>(
      this.host + '/fournisseur/update/' + id,
      data,
      this.httpOptions
    );
  }
  deleteFournisseurById(id: number) {
    return this.http.post<any>(
      this.host + '/fournisseur/delete/' + id,
      null,
      this.httpOptions
    );
  }
  getFournisseurById(id: number) {
    return this.http.get<any>(
      this.host + '/fournisseur/' + id,
      this.httpOptions
    );
  }
}
