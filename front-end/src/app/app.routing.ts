import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {RegisterComponent} from './examples/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: ComponentsComponent,
    children: [
    //   {
    //     path: 'post',
    //     loadChildren: () => import('./user-component/post/post.module').then(m => m.PostModule),
  
    // },
    ]
  },
  {
      path: 'product',
      loadChildren: () => import('./user-component/product/product.module').then(m => m.ProductModule),
  },
   {
      path: 'post',
      loadChildren: () => import('./user-component/post/post.module').then(m => m.PostModule),

  },
  {
    path: 'skincare',
    loadChildren: () => import('./user-component/skincare/skincare.module').then(m => m.SkincareModule),

},



  { path: 'nucleoicons', component: NucleoiconsComponent },
  { path: 'examples/landing', component: LandingComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'examples/profile', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
