import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit{
  contactForm!: FormGroup;
  addresses: string[] = []; 
  newAddress: string = '';
  longitude!: number;
  latitude!: number;
  contactInformations: any;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private geolocationService: GeolocationService
  ) {
  }

  ngOnInit(): void {
   this.getGeo()

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      newAddress: [''], 
      longitude: [{ value: '', disabled: true }, [Validators.required]],
      latitude: [{ value: '', disabled: true }, [Validators.required]],

    });
  }

  getGeo(){
    this.geolocationService.getCurrentPosition()
    .then(coords => {
      this.contactForm.patchValue({
        longitude: coords.longitude,
        latitude: coords.latitude
      });
      this.longitude = coords.longitude,
      this.latitude = coords.latitude
      
      
    })
    .catch(err => {
      // this.error = err.message;
    });
  }

  addAddress(): void {
    if (this.contactForm.get("newAddress")?.value) {
      this.addresses.push(this.contactForm.get("newAddress")?.value);
      this.contactForm.patchValue({
        newAddress: ''
      })
    }
  }

  removeAddress(index: number): void {
    this.addresses.splice(index, 1);
  }
 
  onSubmit(): void {
    this.isLoading = true;
    setTimeout(()=>{
      if (this.contactForm.valid) {
        const formData = { ...this.contactForm.value, addresses: this.addresses, longitude: this.longitude, latitude: this.latitude };
        console.log('Form Values:', formData);
        this.storeInLocalStorage(formData)
        this.contactForm.reset()
        this.getGeo()
        this.addresses = [];
      } else {
        console.error('Form is invalid');
      }
      this.isLoading = false;
    }, 3000)
   
  }

  storeInLocalStorage(data: any): void {
    const storageKey = 'contactInformations';
    const currentData = localStorage.getItem(storageKey);
    let dataArray: any[] = currentData ? JSON.parse(currentData) : [];
    dataArray.push(data);
    localStorage.setItem(storageKey, JSON.stringify(dataArray));
  }
  
}
