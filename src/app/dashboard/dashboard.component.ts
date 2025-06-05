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
  productList: any[] | undefined;
  userList: any[] | undefined;
  transactions: any[] | undefined;
  analytics: any;
  userCount: any;

  constructor(
    private productService: ProductService,
    private userService: UsersService
  ){
    this.fetchFromLocalStorage()
    this.getProducts()
    this.getUsers()
    this.getAllTransactions()
    this.getAnalytics()
    this.getNewUsers()
  }

  getAllTransactions(){
    this.productService.getAllTransactions().subscribe((response: any)=>{
      // //console.log(response)
      const sortedData = response.data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      this.transactions = sortedData
    })
  }

  fetchFromLocalStorage(): void {
    const storageKey = 'contactInformations';
    const currentData = localStorage.getItem(storageKey);
    this.storedData = currentData ? JSON.parse(currentData) : [];
    // //console.log('Fetched Data:', this.storedData);
  }

  getProducts(){
    this.productService.getAllProducts().subscribe((response: any)=>{
      // //console.log(response)
      this.productList = response.data
    })
  }

  getUsers(){
    // this.userService.getUsers().subscribe((response: any)=>{
    //   //console.log(response)
    //   if(response.success){
    //     this.userList = response.data
        
    //   }
      
    // })
  }

  getAnalytics(){
    this.userService.getAnalytics().subscribe((response: any)=>{
      if(response.success){
        this.analytics = response.data
      }
    })
  }

  getNewUsers(){
    this.userService.searchQuery(this.getFormattedDate(400), '', '', 2000000, 1).subscribe((response: any)=>{
      // //console.log(response)
      this.userCount = response.data?.length
      this.userList = response.data
    })
  }

  addDaysToDate(days: number): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  getFormattedDate(daysToSubtract: number = 0): string {
    const today = new Date();
    today.setDate(today.getDate() - daysToSubtract);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  getTodayDateFormatted(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}
  


}
