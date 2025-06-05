import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  offers: any;
  public offerState: 'viewOffers' | 'createOffers' = 'viewOffers';
  offerForm: FormGroup;
  isLoading = false;
  selectedFiles: { [key: string]: File } = {};
  formData: any = {};
  productImage: any;
  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
  ){
    this.getOffers()
    this.offerForm = this._formBuilder.group({
      description: ['', [Validators.required]],
      
  });
  }

  getOffers(){
    this.productService.getOffers().subscribe((response: any)=>{
      //console.log(response)
      this.offers = response.data
    })
  }

  deleteOffer(id: any){
    this.productService.deleteOffer(id).subscribe((response: any)=>{
      //console.log(response)
    })
  }

  onFileSelected(event: any, fieldName: string) {
    this.isLoading = true
    const file: File = event.target.files[0];

    if(file) {
      this.selectedFiles[fieldName] = file;
    }
    // //console.log(this.selectedFiles);
    this.uploadImage()
}

uploadImage(){
  // this.loader.show()
  const allBody = { ...this.selectedFiles };
  const formData = new FormData();
  for (const key in allBody) {
      if (allBody.hasOwnProperty(key)) {
          formData.append(key, allBody[key]);
      }
  }
  formData.append('image', this.formData.image);
  this.productService.convertImage(formData).subscribe((response: any)=>{
      this.isLoading = false;
      // //console.log(response)
      if(response.success){
          // this.isEnabled = false;
          this.productImage = response?.data?.image
      }
  })
}
onSubmit(){
    const body = {
      // "productId": this.generateUniqueReference(),
      // "validTill": "2094-12-31T23:59:59Z",
      // "description": "A high-quality product with excellent features.",
      "images": [
        this.productImage
      ]
    }
    
    this.productService.createOffers(body).subscribe((response: any)=>{
      //console.log(response)
      if(response.success){
        alert('Your offer has been created and published.');
        this.getOffers()
        this.offerState = 'viewOffers';
      }
    },(error)=>{
      alert(error.error.message);
    })
  }

  delete(id: any){
    this.productService.deleteOffer(id).subscribe((response: any)=>{
      if(response.success){
        alert('Deleted Successfully!');
        this.getOffers()
      }
    },(error)=>{
      alert(error.error.message);
    })
  }

  generateUniqueReference(): string {
    const timestamp = new Date().getTime().toString(); // Current timestamp
    const randomString = Math.random().toString(36).substring(2, 10); // Random string
    return `ref_${timestamp}_${randomString}`; // Combine them into a unique reference
  }
}
