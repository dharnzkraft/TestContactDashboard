import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  username: any;

  constructor(private userService: UsersService, private router: Router){
    this.userService.getLoggedInUser().subscribe((response: any)=>{
      console.log(response)
      this.username = response.data?.fullName
      
    })
  }
}
