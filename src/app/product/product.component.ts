import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  isModalOpen = false;
  productList: any;
  selectedProductId: any;

  constructor(
    private productService: ProductService
  ){
    this.getProducts()
  }

  getProducts(){
    this.productService.getAllProducts().subscribe((response: any)=>{
      console.log(response)
      this.productList = response.data
    })
  }


  openModal(id: any) {
    this.selectedProductId = id
    console.log(this.selectedProductId)
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
