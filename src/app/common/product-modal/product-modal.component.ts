import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnChanges {

  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() productId: string = '';
  productDetails: any;

  constructor(
    private productService: ProductService
  ){
    
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  getDetails(){
    this.productService.getAProduct(this.productId).subscribe((response: any) => {
      console.log(response)
      this.productDetails = response.data
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.productId)
    if(this.productId){
      this.getDetails()
    }
  }
}
