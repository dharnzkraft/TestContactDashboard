import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  storedData: any[] = [];
  productList: any;
  userList: any;

  constructor(
    private productService: ProductService,
    private userService: UsersService
  ){
    this.fetchFromLocalStorage()
    this.getProducts()
    this.getUsers()
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

  getUsers(){
    this.userService.getUsers().subscribe((response: any)=>{
      console.log(response)
      if(response.success){
        this.userList = response.data
        
      }
      
    })
  }


}
