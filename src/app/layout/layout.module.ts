import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { CurrencyFormatPipe } from '../currency-formatter.pipe';
import { NairaCurrencyPipe } from '../naira-currency.pipe';
import { TransactionsComponent } from '../transactions/transactions.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    DashboardComponent,
    AddContactComponent,
    AuthPageComponent,
    CurrencyFormatPipe,
    NairaCurrencyPipe,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CurrencyFormatPipe
  ]
})
export class LayoutModule { }
