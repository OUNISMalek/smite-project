import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/Product/", data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/Product/");
  }
putProduct(data : any , id : number){
    return this.http.put<any>("http://localhost:3000/Product/"+id ,data);
}
deleteProduct(id : number){
   return this.http.delete<any>("http://localhost:3000/Product/"+id);
}

//charge method
postCharge(data : any){
  return this.http.post<any>("http://localhost:3000/charges/", data);
}
getCharge(){
  return this.http.get<any>("http://localhost:3000/charges/");
}
putCharge(data : any , id : number){
  return this.http.put<any>("http://localhost:3000/charges/"+id ,data);
}
deleteCharge(id : number){
 return this.http.delete<any>("http://localhost:3000/charges/"+id);
}
}
