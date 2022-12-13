import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Servch3Service {
  constructor(private http : HttpClient) { }
   //charge method
postCharge(data : any){
  return this.http.post<any>("http://localhost:3000/Personnel/",data);
}
getCharge(){
  return this.http.get<any>("http://localhost:3000/Personnel/");
}
putCharge(data : any , id : number){
  return this.http.put<any>("http://localhost:3000/Personnel/"+id ,data);
}
deleteCharge(id : number){
  return this.http.delete<any>("http://localhost:3000/Personnel/"+id);
}
}
