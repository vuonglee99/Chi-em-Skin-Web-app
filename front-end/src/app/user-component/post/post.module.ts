import { NgModule } from '@angular/core';
import {SpinnerOverlayModule} from '../../shared/spinner/spinner-overlay.module';
import {SharedModule} from '../../shared/spinner/shared.module';
import {DashboardComponent} from './dashboard.component';
import {ProductModule} from '../product/product.module';
import {PostListComponent} from './post-list/post-list.component';
import {PostSideMenuComponent} from './post-side-menu/post-side-menu.component';
import {PostRoutingModule} from './post.routing';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {MyPostComponent} from './my-post/my-post.component';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import {NgPrimeModule} from '../../app.primeNg.module';
import {PostDataService} from '../../core/services/post-data.service';
import {AddPostComponent} from './add-post/add-post.component';
import {TipListComponent} from './tip-list/tip-list.component';
import {TipDashboardComponent} from './tip-dashboard/tip-dashboard.component';
import {TipDetailComponent} from './tip-detail/tip-detail.component';
import {AccountComponent} from './account/account.component';
import {SupportingComponent} from './supporting/supporting.component';

@NgModule({
    imports: [
      ReactiveFormsModule,
      NgPrimeModule,
      NouisliderModule,
      JwBootstrapSwitchNg2Module,
      CommonModule,
      FormsModule,
      NgbModule,
      SpinnerOverlayModule,
      SharedModule,
      PostRoutingModule,
      ProductModule,

    ],
    declarations: [
      DashboardComponent,
      PostListComponent,
      PostSideMenuComponent,
      PostDetailComponent,
      MyPostComponent,
      AddPostComponent,
      TipListComponent,
      TipDashboardComponent,
      TipDetailComponent,
      AccountComponent,
      SupportingComponent

    ],
  
    providers:[
      PostDataService
    ],
    exports:[
      TipListComponent
    ]
  })
  export class PostModule { }
  