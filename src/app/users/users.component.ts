import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userList: any;
  public userState: "viewUsers" | "viewUserDetails" = "viewUsers";
  viewedUser: any;
  userFullDetails: any;
  userSubscription: any;

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

  showUser(id: any){

    const viewedUser =  this.userList.findIndex((item: { id: any; }) => item.id === id)
    this.viewedUser = this.userList[viewedUser]
    this.userService.getUserFullDetails(id).subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        this.userFullDetails = response.data
        this.userSubscription = this.userFullDetails.subscriptions
      }
    })
    console.log(this.viewedUser)
    this.userState = 'viewUserDetails'
  }
  
  blockUser(){
    this.userService.blockUser(this.viewedUser.id).subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        alert('user blocked successfully!')
      }
    })
  }

  unblockUser(){
    this.userService.unblockUser(this.viewedUser.id).subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        alert('user unblocked successfully!')
      }
    })
  }
  
}
