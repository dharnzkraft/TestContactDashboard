import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  {
    path: 'authentication', component: AuthPageComponent
  },
  {
    path: 'dashboard', 
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/layout/layout.module').then(
            (m) => m.LayoutModule
          ),
      }
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
