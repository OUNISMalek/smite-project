import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  constructor(private http: HttpClient) {}

  host = environment.backEndHost;
  addFournisseur(data: any) {
    return this.http.post<any>(this.host + '/fournisseur/', data);
  }
  getAllFournisseur() {
    return this.http.get<any>(this.host + '/fournisseur/');
  }
  updateFournisseur(data: any, id: number) {
    return this.http.post<any>(this.host + '/fournisseur/update/' + id, data);
  }
  deleteFournisseurById(id: number) {
    return this.http.post<any>(this.host + '/fournisseur/delete/' + id, null);
  }
  getFournisseurById(id: number) {
    return this.http.get<any>(this.host + '/fournisseur/' + id);
  }
}
