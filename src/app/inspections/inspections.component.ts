import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss']
})
export class InspectionsComponent {
  allProducts: any;
  allInspections: any;
  public InspState: "view" | "add" | "viewMore" = "view";
  inspectionForm: FormGroup
  viewedInsp: any;

  constructor(
    private userService: UsersService,
    private productService: ProductService,
    private fb: FormBuilder,
  ){
    this.getInspections();
    this.getProducts();

    this.inspectionForm = this.fb.group({
      date: ['', [Validators.required]],
      productId: ['', [Validators.required]]
    });
  }

  getProducts(){
    this.productService.getAllProducts().subscribe((response: any)=>{
      if(response.success){
        this.allProducts = response.data
      }
    })
  }

  getInspections(){
    this.userService.getAllInspections().subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        this.allInspections = response.data
      }
    })
  }

  deleteInspection(id: any){
    this.userService.deleteInspection(id).subscribe((response: any)=>{
      console.log(response)
      if(response.success){
        this.getInspections()
      }
    })
  }

  onSubmitRegister(){
    if(this.inspectionForm.valid){
      this.userService.createInspection(this.inspectionForm.value).subscribe((response: any)=>{
        if(response.success){
          this.getInspections()
          this.InspState = "view"
        }
      })
    }
  }

  viewInsp(id: any){
    this.userService.getOneInspection(id).subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        this.viewedInsp = response.data
        this.InspState = "viewMore"
        
      }
    })
  }
}
