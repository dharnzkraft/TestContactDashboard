import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userList: any;

  constructor(
    private userService: UsersService
  ){
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe((response: any)=>{
      console.log(response)
      if(response.success){
        this.userList = response.data
      }
      
    })
  }
}
