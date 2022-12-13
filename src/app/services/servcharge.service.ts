import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServchargeService {

  constructor(private http : HttpClient) { }
  //charge method
postCharge(data : any){
  return this.http.post<any>("http://localhost:3000/Charge/",data);
}
getCharge(){
  return this.http.get<any>("http://localhost:3000/Charge/");
}
putCharge(data : any , id : number){
  return this.http.put<any>("http://localhost:3000/Charge/"+id ,data);
}
deleteCharge(id : number){
  return this.http.delete<any>("http://localhost:3000/Charge/"+id);
}
}
