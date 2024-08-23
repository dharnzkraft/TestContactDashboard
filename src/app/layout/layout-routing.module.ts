import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { UsersComponent } from '../users/users.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { InspectionsComponent } from '../inspections/inspections.component';
import { OffersComponent } from '../offers/offers.component';
import { TransactionsComponent } from '../transactions/transactions.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'add-contact', component: AddContactComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {path: 'withdrawals', component: SubscriptionsComponent},
  { path: 'inspections', component: InspectionsComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'transactions', component: TransactionsComponent }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { 

}
