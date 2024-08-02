import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  isModalOpen = false;
  productList: any;
  selectedProductId: any;
  productState: 'viewProduct' | 'addProduct' = 'viewProduct';
  isChecked = false;
    productForm: FormGroup;
    selectedFiles: { [key: string]: File } = {};
    formData: any = {};
    isEnabled = true;
    productImage: any;
  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
  ){
    this.getProducts()
    this.productForm = this._formBuilder.group({
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location_description: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
      category: ['', [Validators.required]],
      dailyPlan: [''],
      weeklyPlan: [''],
      monthlyPlan: [''],
      // isZeroPay: [],
      view: [[], [Validators.required]],
  });
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

  onFileSelected(event: any, fieldName: string) {
    const file: File = event.target.files[0];

    if (file) {
        this.selectedFiles[fieldName] = file;
    }
    console.log(this.selectedFiles);
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
        // this.loader.hide()
        console.log(response)
        if(response.success){
            this.isEnabled = false;
            this.productImage = response?.data?.image
        }
    })
}

onSubmit(){
    // this.loader.show()
    console.log('fired')
    this.productForm.value.veiw = [this.productImage]
    this.productService.createProduct(this.productForm.value).subscribe((response: any)=>{
        // this.loader.hide()
        console.log(response)
        if(response.success){
            // this.notifier.success('Success', 'Product Added Successfully')
            // this.closeDialogue()
            alert('Product added successfully!');
            this.getProducts()
            this.productState = 'viewProduct';
        }
    },(error)=>{
        // this.loader.hide()
        // this.notifier.error('Oops!', error.error.message)
        alert(error.error.message)
    })
}
}
