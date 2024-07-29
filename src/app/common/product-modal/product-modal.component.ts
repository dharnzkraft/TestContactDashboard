import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {

  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() productId: string = '';

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
    })
  }

  ngOnInit(){
    if(this.productId){
      this.getDetails()
    }
  }
}
