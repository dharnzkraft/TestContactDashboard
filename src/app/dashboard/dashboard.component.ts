import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  storedData: any[] = [];

  constructor(){
    this.fetchFromLocalStorage()
  }

  fetchFromLocalStorage(): void {
    const storageKey = 'contactInformations';
    const currentData = localStorage.getItem(storageKey);
    this.storedData = currentData ? JSON.parse(currentData) : [];
    // console.log('Fetched Data:', this.storedData);
  }

}
