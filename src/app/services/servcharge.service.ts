import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServchargeService {
  host = environment.hostUrl;
  constructor(private http: HttpClient) { }
  //charge method
  postCharge(data: any) {
    return this.http.post<any>(this.host + "/Charge/", data);
  }
  getCharge() {
    return this.http.get<any>(this.host + "/Charge/");
  }
  putCharge(data: any, id: number) {
    return this.http.put<any>(this.host + "/" + id, data);
  }
  deleteCharge(id: number) {
    return this.http.delete<any>(this.host + "/Charge/" + id);
  }
}
