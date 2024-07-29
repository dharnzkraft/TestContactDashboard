import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  storedData: any[] = [];
  productList: any;

  constructor(
    private productService: ProductService
  ){
    this.fetchFromLocalStorage()
    this.getProducts()
  }

  fetchFromLocalStorage(): void {
    const storageKey = 'contactInformations';
    const currentData = localStorage.getItem(storageKey);
    this.storedData = currentData ? JSON.parse(currentData) : [];
    // console.log('Fetched Data:', this.storedData);
  }

  getProducts(){
    this.productService.getAllProducts().subscribe((response: any)=>{
      console.log(response)
      this.productList = response.data
    })
  }



}
