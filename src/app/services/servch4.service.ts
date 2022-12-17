import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Servch4Service {
  host = environment.hostUrl;
  constructor(private http: HttpClient) { }
  //charge method
  postCharge(data: any) {
    return this.http.post<any>(this.host + "/Impots/", data);
  }
  getCharge() {
    return this.http.get<any>(this.host + "/Impots/");
  }
  putCharge(data: any, id: number) {
    return this.http.put<any>(this.host + "/Impots/" + id, data);
  }
  deleteCharge(id: number) {
    return this.http.delete<any>(this.host + "/Impots/" + id);
  }
}
