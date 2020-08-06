import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {MyPostComponent} from './my-post/my-post.component';
import {AddPostComponent} from './add-post/add-post.component';
import {TipListComponent} from './tip-list/tip-list.component';
import {TipDashboardComponent} from './tip-dashboard/tip-dashboard.component';
import {TipDetailComponent} from './tip-detail/tip-detail.component';
import {AccountComponent} from './account/account.component';
import {SupportingComponent} from './supporting/supporting.component';


const routes: Routes = [
  {
    path: '',
    component:DashboardComponent ,
  },
  {
    path: 'mypost',
    component:MyPostComponent ,
  },
  {
    path: 'add',
    component:AddPostComponent ,
  },
  {
    path: 'tips',
    component:TipDashboardComponent ,
  },
  {
    path: 'account',
    component:AccountComponent ,
  },
  {
    path: 'request/support',
    component:SupportingComponent  ,
  },
  {
    path: 'post-detail/:post_Id',
    component:PostDetailComponent ,
  },
  {
    path: 'tip-detail/:tip_Id',
    component:TipDetailComponent ,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
