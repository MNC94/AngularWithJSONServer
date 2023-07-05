import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {

    
   }


   PutProduct(data:any,id:number)
   {
    return this.http.put<any>("http://localhost:3000/productList/"+id,data);
   }

   deletProduct(id:Number)
   {
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
   }
   postproduct(data:any)
   {
    return this.http.post<any>("http://localhost:3000/productList/",data);
   }

   getproduct()
   {
    return this.http.get<any>("http://localhost:3000/productList/");
   }
}
