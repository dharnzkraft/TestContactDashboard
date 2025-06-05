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
  isLoading: boolean = false;
  selectedProductId: any;
  productState: 'viewProduct' | 'addProduct' = 'viewProduct';
  isChecked = false;
    productForm: FormGroup;
    selectedFiles: { [key: string]: File } = {};
    formData: any = {};
    isEnabled = true;
    productImage: any;
  productImage2: any;
  productImage3: any;
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
      //console.log(response)
      this.productList = response.data

    })
  }


  openModal(id: any) {
    this.selectedProductId = id
    //console.log(this.selectedProductId)
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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

onFileSelected2(event: any, fieldName: string) {
  this.isLoading = true
  const file: File = event.target.files[0];

  if(file) {
    this.selectedFiles[fieldName] = file;
  }
  // //console.log(this.selectedFiles);
  this.uploadImage2()
}

onFileSelected3(event: any, fieldName: string) {
  this.isLoading = true
  const file: File = event.target.files[0];

  if(file) {
    this.selectedFiles[fieldName] = file;
  }
  // //console.log(this.selectedFiles);
  this.uploadImage3()
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
          this.isEnabled = false;
          this.productImage = response?.data?.image
      }
  },(error)=>{
    this.isLoading = false;
    alert(error.error.message)
  })
}

uploadImage2(){
  // this.loader.show()
  const allBody = { ...this.selectedFiles };
  const formData = new FormData();
  for (const key in allBody) {
      if (allBody.hasOwnProperty(key)) {
          formData.append(key, allBody[key]);
      }
  }
  formData.append('image2', this.formData.image);
  this.productService.convertImage(formData).subscribe((response: any)=>{
      this.isLoading = false;
      // //console.log(response)
      if(response.success){
          this.isEnabled = false;
          this.productImage2 = response?.data?.image
      }
  },(error)=>{
    this.isLoading = false;
    alert(error.error.message)
  })
}

uploadImage3(){
  // this.loader.show()
  const allBody = { ...this.selectedFiles };
  const formData = new FormData();
  for (const key in allBody) {
      if (allBody.hasOwnProperty(key)) {
          formData.append(key, allBody[key]);
      }
  }
  formData.append('image3', this.formData.image);
  this.productService.convertImage(formData).subscribe((response: any)=>{
      this.isLoading = false;
      // //console.log(response)
      if(response.success){
          this.isEnabled = false;
          this.productImage3 = response?.data?.image
      }
  },(error)=>{
    this.isLoading = false;
    alert(error.error.message)
  })
}

deleteProduct(id: any){
  this.productService.deleteProduct(id).subscribe((response: any)=>{
    //console.log(response)
    if(response.success){
      this.getProducts()
    }
  })
}

onSubmit(){
    // this.loader.show()
    this.isLoading = true;
    // //console.log('fired')
    this.productForm.value.veiw = [this.productImage, this.productImage2, this.productImage3]
    this.productService.createProduct(this.productForm.value).subscribe((response: any)=>{
        // this.loader.hide()
        this.isLoading = false;
        // //console.log(response)
        if(response.success){
          // this.notifier.success('Success', 'Product Added Successfully');
          // this.closeDialogue();
          alert('Product added successfully!');
          this.getProducts();
          this.productForm.reset();
          this.productState = 'viewProduct';
        }
        alert(response.message)
    },(error)=>{
      this.isLoading = false;
        // this.loader.hide()
        // this.notifier.error('Oops!', error.error.message)
        alert(error.error.message)
    })
}
}
