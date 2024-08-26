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

  public convertImage(payload: any){
    return this.http.post(this.baseUrl+`/product/upload-file`, payload)
  }

  public createProduct(payload: any){
    return this.http.post(this.baseUrl+`/product`, payload)
  }

  public deleteProduct(id: any){
    return this.http.delete(this.baseUrl+`/product/${id}`);
  }

  public getOffers(){
    return this.http.get(this.baseUrl+`/offer`)
  }

  public createOffers(payload: any){
    return this.http.post(this.baseUrl+`/offer/create`, payload)
  }

  public deleteOffer(id: any){
    return this.http.delete(this.baseUrl+`/offer/${id}`)
  }

  public getAllTransactions(){
    return this.http.get(this.baseUrl+`/transaction`)
  }

  public getPaginatedTransaction(term?:string, limit?:number, page?:number){
    return this.http.get(this.baseUrl+`/admin/transactions?search_term=${term}&limit=${limit}&page=${page}`)
  }

  
}
