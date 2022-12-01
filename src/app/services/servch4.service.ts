import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Servch4Service {
  constructor(private http : HttpClient) { }
  //charge method
postCharge(data : any){
 return this.http.post<any>("http://localhost:3000/Impots/",data);
}
getCharge(){
 return this.http.get<any>("http://localhost:3000/Impots/");
}
putCharge(data : any , id : number){
 return this.http.put<any>("http://localhost:3000/Impots/"+id ,data);
}
deleteCharge(id : number){
 return this.http.delete<any>("http://localhost:3000/Impots/"+id);
}
}
