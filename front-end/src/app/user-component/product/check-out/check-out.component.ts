import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import { Cart } from '../../../core/model/cart.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Order } from '../../../core/model/order.model';
import {OrderStatus} from '../../../core/model/order-status.model';


@Component({
  selector: 'app-check-out',
  templateUrl: 'check-out.component.html',
})
export class CheckOutComponent extends AppComponentBase implements OnInit {

  cartInput: Cart = new Cart();
  cartList: Cart[] = [];
  orderInput: Order = new Order();
  orderList: Order[] = [];
  newOrderForm: FormGroup;
  orderStatusInput:OrderStatus=new OrderStatus();
  orderStatusList:OrderStatus[]=[];

  totalProducts: number = 0;
  totalCart: number = 0;
  isBusy: boolean = false;
  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.newOrderForm = this.formBuilder.group({
      'USER_NAME': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      'USER_EMAIL': new FormControl('', [Validators.required, Validators.email]),
      'USER_PHONENUMBER': new FormControl(Number, [Validators.required]),
      'USER_ADDRESS': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
    this.wowService.init();
  }

  ngOnInit() {
    this.checkAuth();
    this.setNewOrder();
    this.titleService.setTitle("Đặt hàng");
    this.getAllOrderStatuses();
    this.getCart();
    
  }

  getCart() {
    this.isBusy = true;
    this.productService.getCart(this.currentUser.USER_ID).subscribe(res => {
      this.cartList = res["data"];
      this.isBusy = false;
      this.totalProducts = this.cartList.length;
      for (var i = 0; i < this.cartList.length; i++) {
        this.totalCart += (this.cartList[i].PRODUCT_PRICE * this.cartList[i].PRODUCT_AMOUNT);
      }
    })
  }

  deleteProductFromCart(cart: Cart) {
    this.isBusy = true;
    this.productService.deleteCart(cart).subscribe(res => {
      this.isBusy = false;
      if (res["data"].RESULT == "0") {
        this.notificationService.showSuccess( 'Xóa sản phẩm khỏi giỏ hàng thành công.','Thông báo');
        this.redirectTo('/product/cart', '');
      } else {
        this.notificationService.showError('Xóa sản phẩm thất bại.',"Lỗi");
      }
    })
  }

  setNewOrder() {
    this.isBusy=true;
    for (var property in this.orderInput) {
      this.orderInput[property] = this.currentUser[property];
    }
    this.orderInput.ORDER_PAYMENT="Thanh toán khi nhận hàng";
    this.orderInput.ORDER_MAKEDATE=this.getDate(new Date());
    this.orderInput.ORDER_DATE=this.getNextDate(4);
    this.orderInput.USER_PHONENUMBER=Number(this.currentUser.USER_PHONENUMBER);
    this.isBusy=false;
  }

  buy() {
    this.isBusy = true;
    for (var i = 0; i < this.cartList.length; i++) {
      let orderTmp: Order = new Order();
      for (var property in this.cartList[i]) {
        if (typeof orderTmp[property] !== 'undefined') {
          orderTmp[property] = this.cartList[i][property];
        }
      }

      this.orderList.push(orderTmp);
    }

    console.log(this.orderInput.ORDER_MAKEDATE,this.orderInput.ORDER_DATE);
    for (var i = 0; i < this.orderList.length; i++) {
      for (var property in this.orderList[i]) {
        if (this.orderList[i][property] == null)
          this.orderList[i][property] = this.orderInput[property];
      }
      this.orderList[i].ORDER_TOTAL=this.orderList[i].PRODUCT_PRICE*this.orderList[i].PRODUCT_AMOUNT+20000;
    }

    this.productService.addOrder(this.orderList).subscribe(res => {
      this.isBusy = false;
      if (res["data"].RESULT == "0") {
        let result = this.deleteCartById();
        this.notificationService.showSuccess( 'Đặt hàng thành công.',"Thông báo");
        this.redirectTo('/product/orders','');
      } else {
        this.notificationService.showError(res["data"].ERROR_DESC,"Lỗi");
      }
    })
  }

  deleteCartById(): any {
    this.isBusy = true;
    this.productService.deleteCartById(this.cartList).subscribe(res => {
      this.isBusy = false;
      if (res["data"].RESULT == "0") return "0";
      else return res["data"].ERROR_DESC;
    })

  }

  getAllOrderStatuses(){
    this.isBusy=true;
    this.productService.getOrderStatus(this.orderStatusInput).subscribe(res =>{
      this.isBusy=false;
      this.orderStatusList=res["data"];
      this.orderInput.ORDER_STATUS=this.orderStatusList[0].STATUS_CONTENT;
      this.orderInput.ORDER_PROCESSING=this.orderStatusList[0].ORDER_PROCESSING;
      console.log(this.orderInput.ORDER_PROCESSING);
    })
  }

}
