import { Component, OnInit, Injector, Input,ViewChild,AfterViewInit} from '@angular/core';
import { Product } from '../../../core/model/product.model';
import { AppComponentBase } from '../../../core/app.component.base';
import { Cart } from '../../../core/model/cart.model';
import { NgImageSliderComponent } from 'ng-image-slider';
import { WOW } from 'wowjs/dist/wow.min';



@Component({
    selector: 'app-product-list',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent extends AppComponentBase implements OnInit {

    @Input() sortBy: any = null;
    @Input() isPaging: boolean = false;
    @Input() numProductOnRow: string;
    @Input() pageSize: number = 12;
    @Input() productType: string = null;
    @Input() isMinToMax: boolean = false;
    @Input() isAutoSlider: boolean = false;
    @Input() productName:string=null;

    productList: Product[] = [];
    productInput: Product = new Product();
    @ViewChild('nav') slider: NgImageSliderComponent;
    productObject: Array<object> =null;


    isBusy: boolean = false;
    isEmpty: boolean = true;
    totalProduct: number = 0;
    page: number = 1;
    cartInput: Cart = new Cart();
    ngOnInit() {
        this.getCurrentUser();
        this.getAllProducts();

    }
    
    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.wowService.init();
    }

    getAllProducts() {
        this.isBusy = true;
        this.productInput.PRODUCT_TYPE = this.productType;
        this.productInput.PRODUCT_NAME=this.productName;
        this.productService.getAllProducts(this.productInput).subscribe(res => {
            this.productList = res["data"];
            this.totalProduct = this.productList.length;
            (this.totalProduct == 0) ? this.isEmpty = true : this.isEmpty = false;

            if (this.sortBy != null) {
                for (var i = 0; i < this.totalProduct; i++) {
                    for (var j = i + 1; j < this.totalProduct; j++) {
                        if (!this.isMinToMax) {//từ lớn đến bé
                            if (this.productList[i][this.sortBy] < this.productList[j][this.sortBy]) {

                                let post: Product = this.productList[i];
                                this.productList[i] = this.productList[j];
                                this.productList[j] = post;
                            }
                        } else {
                            if (this.productList[i][this.sortBy] > this.productList[j][this.sortBy]) {

                                let post: Product = this.productList[i];
                                this.productList[i] = this.productList[j];
                                this.productList[j] = post;
                            }
                        }

                    }
                }
            }

            this.isBusy = false;
        })
    }


    addToCart(product: Product) {
        this.checkAuth();
        if(this.unAuth)
            return;
        this.isBusy = true;
        for (var property in product) {
            this.cartInput[property] = product[property];
        }
        this.cartInput.PRODUCT_AMOUNT = 1;
        this.cartInput.USER_ID = this.currentUser.USER_ID;
        this.cartInput.PRODUCT_TOTAL = this.cartInput.PRODUCT_TOTAL - 1;
        this.productService.addToCart(this.cartInput).subscribe(res => {
            this.isBusy = false;
            if (res["data"].RESULT == "0") {
                this.addProductToSession(1);
                this.notificationService.showSuccess('Thêm vào giỏ hàng thành công.','Thông báo');
                this.redirectTo('/index', '');

            } else {
                this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
            }
        })
    }

}