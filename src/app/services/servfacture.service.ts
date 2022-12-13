import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Facture } from '../models/facture.model';
@Injectable({
  providedIn: 'root'
})
export class ServfactureService {

  constructor(private http: HttpClient) { }


  saveFacture(data: any) {
    return this.http.post<any>("http://localhost:3000/Facture/", data);
  }
  getFacture(id: number) {
    return this.http.get<Facture>("http://localhost:3000/Facture/" + id);
  }
  putFacture(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/Facture/" + id, data);
  }
  deleteFacture(id: number) {
    return this.http.delete<number>("http://localhost:3000/Facture/" + id);
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
