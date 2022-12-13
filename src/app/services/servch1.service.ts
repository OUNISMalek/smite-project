import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Servch1Service {

  constructor(private http : HttpClient) { }
    //charge method
postCharge(data : any){
  return this.http.post<any>("http://localhost:3000/Cotisation/",data);
}
getCharge(){
  return this.http.get<any>("http://localhost:3000/Cotisation/");
}
putCharge(data : any , id : number){
  return this.http.put<any>("http://localhost:3000/Cotisation/"+id ,data);
}
deleteCharge(id : number){
  return this.http.delete<any>("http://localhost:3000/Cotisation/"+id);
}
}
