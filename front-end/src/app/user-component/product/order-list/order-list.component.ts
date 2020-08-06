import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import { Order } from '../../../core/model/order.model';
import {OrderStatus} from '../../../core/model/order-status.model';
import { WOW } from 'wowjs/dist/wow.min';


@Component({
  selector: 'app-order-list',
  templateUrl: 'order-list.component.html',
})
export class OrderListComponent extends AppComponentBase implements OnInit {

    orderInput: Order = new Order();
    currentOrderList: Order[] = [];
    allOrderList: Order[] = [];
    orderStatusInput:OrderStatus=new OrderStatus();
    orderStatusList:OrderStatus[]=[];
  
    isBusy: boolean = false;
    isEmpty:boolean=true;
    totalOrders:number=0;
    totalCurrentOrder:number=0;
    pageCurrent=1;
    pageSizeCurrent=2;
    page=1;
    pageSize=12;
  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.wow.init();

  }

  ngOnInit() {
    this.titleService.setTitle("Đơn hàng của tôi");
    this.checkAuth();
    if(this.unAuth) return;
    this.orderInput.USER_ID=this.currentUser.USER_ID;
    this.getCurrentOrders();
    this.getAllOrders();
  }

  getCurrentOrders() {
      this.isBusy = true;
      this.orderInput.RECORD_STATUS = "1";
      this.productService.getOrder(this.orderInput).subscribe(res => {
          this.currentOrderList = res["data"];
          this.totalCurrentOrder=this.currentOrderList.length;
          if(this.currentOrderList.length==0) this.isEmpty=true;
          else this.isEmpty=false;
          this.isBusy = false;
          console.log(this.currentOrderList);
      })
  }

  getAllOrders() {
      this.isBusy = true;
      this.orderInput.RECORD_STATUS="";
      this.productService.getOrder(this.orderInput).subscribe(res => {
          this.allOrderList = res["data"];
          this.isBusy = false;
          this.totalOrders=this.allOrderList.length;
      })
  }

  getAllOrderStatuses(){
    this.isBusy=true;
    this.productService.getOrderStatus(this.orderStatusInput).subscribe(res =>{
      this.isBusy=false;
      this.orderStatusList=res["data"];
    })
  }

}
