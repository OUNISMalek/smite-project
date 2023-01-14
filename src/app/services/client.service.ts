import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  host = environment.backEndHost;
  addClient(data: any) {
    return this.http.post<any>(this.host + '/client/', data);
  }
  getAllClient() {
    return this.http.get<any>(this.host + '/client/');
  }
  updateClient(data: any, id: number) {
    return this.http.post<any>(this.host + '/client/update/' + id, data);
  }
  deleteClientById(id: number) {
    return this.http.post<any>(this.host + '/client/delete/' + id, null);
  }
  getClientById(id: number) {
    return this.http.get<any>(this.host + '/client/' + id);
  }
}
