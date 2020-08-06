import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import { Cart } from '../../../core/model/cart.model';
import { User } from '../../../core/model/user.model';
import { Product } from '../../../core/model/product.model';


@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
})
export class CartComponent extends AppComponentBase implements OnInit {

  cartInput: Cart = new Cart();
  cartList: Cart[] = [];
  productInput: Product = new Product();
  productList: Product[] = [];

  totalProducts: number = 0;
  totalCart: number = 0;
  isEmpty: boolean = false;
  isBusy: boolean = false;
  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.wowService.init();
  }

  ngOnInit() {
    this.titleService.setTitle("Giỏ hàng");
    this.checkAuth();
    if(!this.unAuth)
      this.getCart();
  }



  searchProduct() {

  }

  getCart() {
    this.isBusy = true;
    this.productService.getCart(this.currentUser.USER_ID).subscribe(res => {
      this.cartList = res["data"];
      console.log(this.cartList[0]);
      this.isBusy = false;
      this.totalProducts = this.cartList.length;
      if (this.totalProducts > 0) {
        this.isEmpty = false;
        for (var i = 0; i < this.cartList.length; i++) {
          this.totalCart += (this.cartList[i].PRODUCT_PRICE * this.cartList[i].PRODUCT_AMOUNT);
        }
      } else this.isEmpty = true;

    })
  }

  deleteProductFromCart(cart: Cart) {
    this.isBusy = true;
    this.productService.deleteCart(cart).subscribe(res => {
      this.isBusy = false;
      if (res["data"].RESULT == "0") {
        this.notificationService.showSuccess('Xóa sản phẩm khỏi giỏ hàng thành công.','Thông báo');
        this.redirectTo('/product/cart', '');
      } else {
        this.notificationService.showError( 'Xóa sản phẩm thất bại.','Lỗi');
      }
    });
  }

  updateCart(cart: Cart, index: number) {
    this.isBusy = true;
    cart.PRODUCT_TOTAL = cart.PRODUCT_TOTAL - index;
    cart.PRODUCT_AMOUNT = cart.PRODUCT_AMOUNT + index;
    this.addProductToSession(index);
    console.log(cart);
    if (cart.PRODUCT_AMOUNT == 0) this.deleteProductFromCart(cart);
    else {

      this.productService.updateCart(cart).subscribe(res => {
        if (res["data"].RESULT == "0") {
          this.notificationService.showSuccess( 'Thay đổi thông tin giỏ hàng thành công.',"Thông báo");
         this.redirectTo('/product/cart','');
        } else {
          this.notificationService.showError(res["data"].ERROR_DESC,'Lỗi');
        }
      })
    }

  }


}
