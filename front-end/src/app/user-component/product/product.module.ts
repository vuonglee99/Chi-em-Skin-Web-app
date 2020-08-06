import { NgModule } from '@angular/core';
import {SpinnerOverlayModule} from '../../shared/spinner/spinner-overlay.module';
import {SharedModule} from '../../shared/spinner/shared.module';
import {ProductListComponent} from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import {ProductService} from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import {NgPrimeModule} from '../../app.primeNg.module';
import {ProductMenuComponent} from './product-menu/product-menu.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductRoutingModule} from './product.routing';
import {ProductSearchComponent} from './product-search/product-search.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {CartComponent} from './cart/cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-list/order-detail.component';
import {ProductByNameComponent} from './product-byName/product-byName.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderModule } from 'angular-image-slider';


@NgModule({
    imports: [
      SliderModule,
      NgImageSliderModule,
      ReactiveFormsModule,
      NgPrimeModule,
      NouisliderModule,
      JwBootstrapSwitchNg2Module,
      CommonModule,
      FormsModule,
      NgbModule,
      SpinnerOverlayModule,
      SharedModule,
      ProductRoutingModule
      
    ],
    declarations: [
      ProductSearchComponent,
      ProductListComponent,
      ProductMenuComponent,
      ProductDetailComponent,
      QuestionListComponent,
      CartComponent,
      CheckOutComponent,
      OrderListComponent,
      OrderDetailComponent,
      ProductByNameComponent
    ],
  
    providers:[
      ProductService
    ],
    exports:[
      ProductListComponent,
      ProductMenuComponent,
      QuestionListComponent
      
    ]
  })
  export class ProductModule { }
  