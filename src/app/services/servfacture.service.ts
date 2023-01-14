import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FactureReq, FactureRes } from '../models/facture.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ServfactureService {
  constructor(private http: HttpClient) {}
  host = environment.backEndHost;

  saveFacture(data: any) {
    return this.http.post<FactureReq>(this.host + '/facture/', data);
  }
  getFacture(id: number) {
    return this.http.get<FactureRes>(this.host + '/facture/' + id);
  }
  updateFacture(data: any, id: number) {
    return this.http.post<any>(this.host + '/facture/update/' + id, data);
  }
  deleteFacture(id: number) {
    return this.http.post<number>(this.host + '/facture/delete/' + id, null);
  }
  getAllClientFacture() {
    return this.http.get<FactureRes>(this.host + '/facture/client/');
  }
  getAllFournisseurFacture() {
    return this.http.get<FactureRes>(this.host + '/facture/fournisseur/');
  }
  getAllClientFactureByClientId(id: number) {
    return this.http.get<FactureRes>(this.host + '/facture/client/' + id);
  }
  confirmFacture(id: number) {
    return this.http.post<number>(this.host + '/facture/confirm/' + id, null);
  }
  cancelFacture(id: number) {
    return this.http.post<number>(this.host + '/facture/cancel/' + id, null);
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
