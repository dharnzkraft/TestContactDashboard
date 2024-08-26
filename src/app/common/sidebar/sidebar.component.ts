import { Component, HostListener } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  adminType: any;

  constructor(private userService: UsersService){
    this.userService.getLoggedInUser().subscribe((response: any)=>{
      console.log(response)
      this.adminType = response.data?.role
    })
  }

  sidebarVisible = true;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.sidebarVisible = true;
    }
  }

  

  logout(){
    
  }

  // toggleSidebar() {
  //   this.sidebarVisible = !this.sidebarVisible;
  // }
}
