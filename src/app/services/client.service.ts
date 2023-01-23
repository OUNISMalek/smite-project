import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  host = environment.backEndHost;
  addClient(data: any) {
    return this.http.post<any>(this.host + '/client/', data, this.httpOptions);
  }
  getAllClient() {
    return this.http.get<any>(this.host + '/client/', this.httpOptions);
  }
  updateClient(data: any, id: number) {
    return this.http.post<any>(
      this.host + '/client/update/' + id,
      data,
      this.httpOptions
    );
  }
  deleteClientById(id: number) {
    return this.http.post<any>(
      this.host + '/client/delete/' + id,
      null,
      this.httpOptions
    );
  }
  getClientById(id: number) {
    return this.http.get<any>(this.host + '/client/' + id, this.httpOptions);
  }
}
