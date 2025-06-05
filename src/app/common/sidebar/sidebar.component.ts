import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  adminType: any;

  constructor(private userService: UsersService, private router: Router){
    this.userService.getLoggedInUser().subscribe((response: any)=>{
      //console.log(response)
      this.adminType = response.data?.role
      //console.log(this.adminType)
      if(this.adminType === 'user' ){
        this.router.navigateByUrl('/')
      }
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
    localStorage.clear()
    this.router.navigateByUrl('/')
  }

  // toggleSidebar() {
  //   this.sidebarVisible = !this.sidebarVisible;
  // }
}
