import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions: any;
  selectedTransaction: any;
  public tranState: 'transactions' | 'viewTransactioins' = 'transactions'

  constructor(
    private productService: ProductService
  ){
    this.getAllTransactions()
    this.getPaginated()
  }

  getAllTransactions(){
    this.productService.getAllTransactions().subscribe((response: any)=>{
      const sortedData = response.data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      this.transactions = sortedData
    })
  }

  ShowTransaction(id: any){
    const selectedTransaction = this.transactions?.findIndex((item: { id: any; }) => item.id === id);
    this.selectedTransaction = this.transactions[selectedTransaction]
    this.tranState = 'viewTransactioins';
  }

  getPaginated(){
    this.productService.getPaginatedTransaction('transaction',20,1).subscribe((response: any)=>{
      //console.log(response)
    })
  }
}
