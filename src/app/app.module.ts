import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductComponent } from './product/product.component';
import { ProductModalComponent } from './common/product-modal/product-modal.component';
import { UsersComponent } from './users/users.component';
import { CurrencyFormatPipe } from './currency-formatter.pipe';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { OffersComponent } from './offers/offers.component';
import { NairaCurrencyPipe } from './naira-currency.pipe';
import { TransactionsComponent } from './transactions/transactions.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoaderComponent } from './common/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductModalComponent,
    UsersComponent,
    SubscriptionsComponent,
    InspectionsComponent,
    OffersComponent,
    CurrencyFormatPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
