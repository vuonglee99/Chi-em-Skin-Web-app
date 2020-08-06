import { Component, OnInit, Injector,AfterViewInit } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import { Order } from '../../../core/model/order.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {OrderStatus} from '../../../core/model/order-status.model';
import { WOW } from 'wowjs/dist/wow.min';


@Component({
  selector: 'app-order-detail',
  templateUrl: 'order-detail.component.html',
})
export class OrderDetailComponent extends AppComponentBase implements OnInit {

  orderInput: Order = new Order();
  currentOrder: Order;
  notificationForm: FormGroup;
  orderStatusInput: OrderStatus = new OrderStatus();
  orderStatusList: OrderStatus[] = [];
  statusCancel:string;

  isBusy: boolean = false;
  
  constructor(
    injector: Injector,
    private route: ActivatedRoute
  ) {
    super(injector);
    this.titleService.setTitle("Đơn hàng của tôi");
    this.notificationForm = this.formBuilder.group({
      'tittle': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
    
    this.wowService.init();

  }

  ngOnInit() {
    this.checkAuth();
    this.orderInput.ORDER_ID = this.route.snapshot.paramMap.get("order_Id");
    this.getCurrentOrders();
    this.getAllOrderStatuses();
  }

 

  getCurrentOrders() {
    this.isBusy = true;
    this.orderInput.RECORD_STATUS="";
    this.productService.getOrder(this.orderInput).subscribe(res => {
      this.isBusy = false;
      this.currentOrder = res["data"][0];
      console.log(this.currentOrder);
    });
  }

  cancelOrder() {
    this.isBusy = true;
    this.productService.cancelOrder(this.currentOrder.ORDER_ID).subscribe(res => {
      this.isBusy = false;
      if (res["data"].RESULT == "0") {
        this.notificationService.showSuccess('Hủy đơn hàng thành công.','Thông báo');
        this.redirectTo('/product/orders/', this.currentOrder.ORDER_ID);
      }else this.notificationService.showError('Hủy đơn hàng thất bại','Lỗi')
    })
  }

  getAllOrderStatuses() {
    this.isBusy = true;
    this.productService.getOrderStatus(this.orderStatusInput).subscribe(res => {
      this.isBusy = false;
      this.orderStatusList = res["data"];
      this.statusCancel=this.orderStatusList[this.orderStatusList.length-1].STATUS_CONTENT;
    })
  }
}
