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
  

  constructor(
    private userService: UsersService
  ){
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
      }
      
    })
  }

  approveWithdrawal(id: any){
    this.userService.approveWithdrawal(id).subscribe((response: any)=>{
      // console.log(response);
    })
  }

  disapproveWithdrawal(id: any){
    this.userService.disapproveWithdrawal(id).subscribe((response: any)=>{
      // console.log(response)
    })
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
