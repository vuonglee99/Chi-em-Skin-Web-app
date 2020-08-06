import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductSearchComponent} from './product-search/product-search.component';
import {CartComponent} from './cart/cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-list/order-detail.component';
import {ProductByNameComponent} from './product-byName/product-byName.component';


const routes: Routes = [
  { 
    path: 'cart',
    component: CartComponent
  },
  { 
    path: 'checkout',
    component: CheckOutComponent
  },
  { 
    path: 'orders',
    component: OrderListComponent
  },
  { 
    path: 'orders/:order_Id',
    component: OrderDetailComponent
  },
  {
    path: ':productType_Id',
    component: ProductSearchComponent
  },
  {
    path: 'detail/:product_Id',
    component:ProductDetailComponent ,
    data: {
      title: 'Chi tiết sản phẩm'
    }
  },
  {
    path: 'byName/:product_Name',
    component:ProductByNameComponent ,
    data: {
      title: 'Chi tiết sản phẩm'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
