import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllProducts(){
    return this.http.get(this.baseUrl+`/product`);
  }

  getAProduct(id: any){
    return this.http.get(this.baseUrl+`/product/${id}`);
  }

  calculate(payload: any){
    return this.http.post(this.baseUrl+`/product/calculate-duration`, payload);
  }
}
