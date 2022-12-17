import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Servch3Service {
  host = environment.hostUrl;
  constructor(private http: HttpClient) { }
  //charge method
  postCharge(data: any) {
    return this.http.post<any>(this.host + "/Personnel/", data);
  }
  getCharge() {
    return this.http.get<any>(this.host + "/Personnel/");
  }
  putCharge(data: any, id: number) {
    return this.http.put<any>(this.host + "/Personnel/" + id, data);
  }
  deleteCharge(id: number) {
    return this.http.delete<any>(this.host + "/Personnel/" + id);
  }
}
