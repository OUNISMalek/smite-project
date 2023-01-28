import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ClientReq, ClientRes } from '../models/client.model';

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
  addClient(data: ClientReq): Observable<ClientRes> {
    return this.http.post<ClientRes>(
      this.host + '/client',
      data,
      this.httpOptions
    );
  }
  getAllClient() {
    return this.http.get<ClientRes[]>(this.host + '/client', this.httpOptions);
  }
  updateClient(data: ClientReq, id: number) {
    return this.http.put<ClientRes>(
      this.host + '/client/update/' + id,
      data,
      this.httpOptions
    );
  }
  deleteClientById(id: number) {
    return this.http.post<number>(
      this.host + '/client/delete/' + id,
      null,
      this.httpOptions
    );
  }
  getClientById(id: number) {
    return this.http.get<ClientRes>(
      this.host + '/client/' + id,
      this.httpOptions
    );
  }
}
