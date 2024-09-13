import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  searchQuery: string = '';
  userList: any;
  public userState: "viewUsers" | "viewUserDetails" = "viewUsers";
  viewedUser: any;
  userFullDetails: any;
  userSubscription: any;
  adminType: any;
  isUserBlocked!: boolean;

  constructor(
    private userService: UsersService,
    private router: Router
  ){
    this.getUsers()
    this.userService.getLoggedInUser().subscribe((response: any)=>{
      console.log(response)
      this.adminType = response.data?.role
      if(this.adminType === 'user' ){
        // this.router.navigateByUrl('/')
      }
    })
  }

  

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    // Implement search logic here
    this.userService.searchQuery('','',this.searchQuery,5000000,1).subscribe((response: any)=>{
      console.log(response)
      if(response.success){
        this.userList = response.data
      }
    })
  }

  getUsers(){
    this.userService.searchQuery('','','',5000000,1).subscribe((response: any)=>{
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
        this.isUserBlocked = response.data?.isBlocked
      }
    })
    // console.log(this.viewedUser)
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

  makeAMaketter(id: any){
    this.userService.makeUserMaketer(id, 'marketter').subscribe((response: any)=>{
      if(response.success){
        alert('Success')
      }
    })
  }

  makeAdmin(id: any){
    this.userService.makeUserMaketer(id, 'admin').subscribe((response: any)=>{
      if(response.success){
        alert('Success')
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
