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
  userCode: any;
  amount: any;
  findWallet = false;

  constructor(
    private userService: UsersService,
    private router: Router
  ){
    this.getUsers()
    this.userService.getLoggedInUser().subscribe((response: any)=>{
      console.log(response)
      this.userCode = response.data?.referalCode
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
      console.log(this.viewedUser)
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
        this.getUsers()
      }
    })
  }

  makeAdmin(id: any){
    this.userService.makeUserMaketer(id, 'admin').subscribe((response: any)=>{
      if(response.success){
        alert('Success')
        this.getUsers()
      }
    })
  }

  makeAccountant(id: any){
    this.userService.makeUserMaketer(id, 'accountant').subscribe((response: any)=>{
      if(response.success){
        alert('Success')
        this.getUsers()
      }
    },(error)=>{
      alert(error.error.message)
    })
  }

  unblockUser(){
    this.userService.unblockUser(this.viewedUser.id).subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        alert('user unblocked successfully!')
        this.getUsers()
      }
    })
  }

  fundUserWallet(){
    const body = {
      amount: this.amount,
      recipient: this.viewedUser?.referalCode,
      description: 'Wallet to wallet transfer',
      reference: this.generateRandomAlphabets(17), //Must be Unique
    };
    this.userService.transferFunds(body).subscribe((response: any)=>{
      console.log(response)
      alert(response.message)
    })
  }

  generateRandomAlphabets(length: number): string {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      result += alphabets[randomIndex];
    }
    return result;
  }
  
  
}
