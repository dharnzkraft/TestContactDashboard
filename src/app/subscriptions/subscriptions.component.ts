import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent {
  withdrawals: any;
  userList: any;
  remappedWithdrawal: any;
  public transferState: 'viewTransfersHistory' | 'makeTransfer' ='viewTransfersHistory' ;
  adminType: any;
  selectedWithdrawal: any;
  approvedByAccountant: boolean = false;

  constructor(
    private userService: UsersService
  ){
    this.userService.getLoggedInUser().subscribe((response: any)=>{
      console.log(response)
      this.adminType = response.data?.role
      // if(this.adminType === 'user' ){
      //   this.router.navigateByUrl('/')
      // }
    })
    this.getUsers()
   
  }

  getWithdrawals(){
    this.userService.getWithdrawalRequests().subscribe((response: any)=>{
      if(response.success){
        this.withdrawals = response.data

        const updatedTransactions = this.withdrawals.map((withdrawal: { user: any; }) => {
          // Find the user with the matching ID
          const user = this.userList.find((user: { id: any; }) => user.id === withdrawal.user);
          
          // If a user is found, replace the user ID with the user's full name
          if (user) {
            return { ...withdrawal, user: user.fullName };
          }
        
          // If no matching user is found, return the transaction as is
          return withdrawal;
        });
        this.remappedWithdrawal = updatedTransactions
        console.log('remapped', this.remappedWithdrawal)
      }
      
    })
  }

  approveWithdrawal(id: any){
    if(this.adminType === 'accountant' ){
      this.accountantApprove(id)
    }else if(this.adminType === 'admin'){
      this.adminApprove(id)
    }else if(this.adminType === 'super_admin'){
      this.superAdminApprove(id)
    }
  }

  accountantApprove(id: any){
    this.userService.accountantApprove(id).subscribe((response: any)=>{
      if(response.success){
        this.getUsers()
        alert(response.message)
      }
    },(error)=>{
      alert(error.error.message)
    })
  }

  adminApprove(id: any){
    this.userService.adminApprove(id).subscribe((response: any)=>{
      if(response.success){
        this.getUsers()
        alert(response.message)
      }
    },(error)=>{
      alert(error.error.message)
    })
  }

  superAdminApprove(id: any){
    this.userService.superAdminApprove(id).subscribe((response: any)=>{
      if(response.success){
        this.getUsers()
        alert(response.message)
      }
    },(error)=>{
      alert(error.error.message)
    })
  }

  disapproveWithdrawal(id: any){
    this.userService.disapproveWithdrawal(id).subscribe((response: any)=>{
      // console.log(response)
    })
  }

  view(data: any){
    this.transferState = 'makeTransfer';
    const fullDetails = this.remappedWithdrawal.filter((item: { id: any; }) => item.id === data.id )
    // console.log(fullDetails)
    this.selectedWithdrawal = fullDetails;
    console.log(this.selectedWithdrawal)
    if(this.selectedWithdrawal[0]?.accountant){
      this.approvedByAccountant = true;
    }
    
  }

  getUsers(){
    this.userService.getUsers().subscribe((response: any)=>{
      // console.log(response)
      if(response.success){
        this.userList = response.data
        this.getWithdrawals()
      }
      
    })
  }

}
