import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = environment.hostUrl;

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>(this.host + "/Product/", data);
  }
  getProduct() {
    return this.http.get<any>(this.host + "/Product/");
  }
  putProduct(data: any, id: number) {
    return this.http.put<any>(this.host + "/Product/" + id, data);
  }
  deleteProduct(id: number) {
    return this.http.delete<any>(this.host + "/Product/" + id);
  }


}
