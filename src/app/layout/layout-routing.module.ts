import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'add-contact', component: AddContactComponent
  },
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { 

}
