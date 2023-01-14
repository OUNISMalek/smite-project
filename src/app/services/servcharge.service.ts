import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServchargeService {
  constructor(private http: HttpClient) {}
  host = environment.backEndHost;
  addCharge(data: any) {
    return this.http.post<any>(this.host + '/charge', data);
  }
  getChargeById(id: number) {
    return this.http.get<any>(this.host + '/charge' + id);
  }
  updateCharge(data: any, id: number) {
    return this.http.post<any>(this.host + '/charge/update' + id, data);
  }
  deleteCharge(id: number) {
    return this.http.post<any>(this.host + '/charge/delete' + id, null);
  }
  getAllCharge() {
    return this.http.get<any>(this.host + '/charge');
  }
}
