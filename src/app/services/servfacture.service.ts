import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FactureReq, FactureRes } from '../models/facture.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServfactureService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  host = environment.backEndHost;

  saveFacture(data: FactureReq): Observable<FactureReq> {
    return this.http.post<FactureReq>(
      this.host + '/facture',
      data,
      this.httpOptions
    );
  }
  getFacture(id: number): Observable<FactureRes> {
    return this.http.get<FactureRes>(
      this.host + '/facture' + id,
      this.httpOptions
    );
  }
  updateFacture(data: FactureReq, id: number) {
    return this.http.post<FactureReq>(
      this.host + '/facture/update/' + id,
      data,
      this.httpOptions
    );
  }
  deleteFacture(id: number): Observable<number> {
    return this.http.post<number>(
      this.host + '/facture/delete/' + id,
      null,
      this.httpOptions
    );
  }
  getAllFacture(): Observable<FactureRes[]> {
    return this.http.get<FactureRes[]>(
      this.host + '/facture',
      this.httpOptions
    );
  }
  getAllClientFacture(): Observable<FactureRes[]> {
    return this.http.get<FactureRes[]>(
      this.host + '/facture/client',
      this.httpOptions
    );
  }
  getAllFournisseurFacture(): Observable<FactureRes[]> {
    return this.http.get<FactureRes[]>(
      this.host + '/facture/fournisseur',
      this.httpOptions
    );
  }
  getAllClientFactureByClientId(id: number): Observable<FactureRes[]> {
    return this.http.get<FactureRes[]>(
      this.host + '/facture/client/' + id,
      this.httpOptions
    );
  }
  confirmFacture(id: number): Observable<number> {
    return this.http.post<number>(
      this.host + '/facture/confirm/' + id,
      null,
      this.httpOptions
    );
  }
  cancelFacture(id: number): Observable<number> {
    return this.http.post<number>(
      this.host + '/facture/cancel/' + id,
      null,
      this.httpOptions
    );
  }
  // GetCustomer() {
  //   return this.http.get('https://localhost:7118/Customer/GetAll');
  // }
  // GetCustomerbycode(code: any) {
  //   return this.http.get('https://localhost:7118/Customer/GetByCode?Code='+code);
  // }
  // GetProducts() {
  //   return this.http.get('https://localhost:7118/Product/GetAll');
  // }
  // GetProductbycode(code: any) {
  //   return this.http.get('https://localhost:7118/Product/GetByCode?Code='+code);
  // }

  // GetAllInvoice(){
  //   return this.http.get('https://localhost:7118/Invoice/GetAllHeader');
  // }

  // GetInvHeaderbycode(invoiceno:any){
  //   return this.http.get('https://localhost:7118/Invoice/GetAllHeaderbyCode?invoiceno='+invoiceno);
  // }
  // GetInvDetailbycode(invoiceno:any){
  //   return this.http.get('https://localhost:7118/Invoice/GetAllDetailbyCode?invoiceno='+invoiceno);
  // }
  // RemoveInvoice(invoiceno:any){
  //   return this.http.delete('https://localhost:7118/Invoice/Remove?invoiceno='+invoiceno);
  // }

  // SaveInvoice(invoicedata:any){
  //   return this.http.post('https://localhost:7118/Invoice/Save',invoicedata);
  // }

  // GenerateInvoicePDF(invoiceno:any){
  //   return this.http.get('https://localhost:7118/Invoice/generatepdf?InvoiceNo='+invoiceno,{observe:'response',responseType:'blob'});

  // }
}
