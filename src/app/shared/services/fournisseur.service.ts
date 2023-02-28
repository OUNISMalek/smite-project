import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FournisseurReq, FournisseurRes } from '../../models/fournisseur.model';

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
  addFournisseur(data: FournisseurReq): Observable<FournisseurRes> {
    return this.http.post<FournisseurRes>(
      this.host + '/fournisseur',
      data,
      this.httpOptions
    );
  }
  getAllFournisseur(): Observable<FournisseurRes[]> {
    return this.http.get<FournisseurRes[]>(
      this.host + '/fournisseur',
      this.httpOptions
    );
  }
  updateFournisseur(
    data: FournisseurReq,
    id: number
  ): Observable<FournisseurRes> {
    return this.http.put<FournisseurRes>(
      this.host + '/fournisseur/update/' + id,
      data,
      this.httpOptions
    );
  }
  deleteFournisseurById(id: number): Observable<number> {
    return this.http.post<number>(
      this.host + '/fournisseur/delete/' + id,
      null,
      this.httpOptions
    );
  }
  getFournisseurById(id: number): Observable<FournisseurRes> {
    return this.http.get<FournisseurRes>(
      this.host + '/fournisseur/' + id,
      this.httpOptions
    );
  }
}
