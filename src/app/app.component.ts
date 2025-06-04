import { Component } from '@angular/core';
import platform from 'platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testDashboard';
  deviceInfo: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;

  constructor() {
    this.epicFunction();
  }

  epicFunction() {
    this.deviceInfo = platform;

    const userAgent = navigator.userAgent.toLowerCase();

    this.isMobile = /iphone|android.*mobile|windows phone/i.test(userAgent);
    this.isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    this.isDesktopDevice = !this.isMobile && !this.isTablet;

    console.log(this.deviceInfo);
    console.log('isMobile:', this.isMobile);
    console.log('isTablet:', this.isTablet);
    console.log('isDesktopDevice:', this.isDesktopDevice);
  }

}
