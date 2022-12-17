import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Facture } from '../models/facture.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServfactureService {
  host = environment.hostUrl;
  constructor(private http: HttpClient) { }


  saveFacture(data: any) {
    return this.http.post<Facture>(this.host + "/Facture/", data);
  }
  getFacture(id: any) {
    return this.http.get<Facture>(this.host + "/Facture/" + id);
  }
  putFacture(data: Facture, id: any) {
    return this.http.put<Facture>(this.host + "/Facture/" + id, data);
  }
  deleteFacture(id: any) {
    return this.http.delete<void>(this.host + "/Facture/" + id);
  }
}
