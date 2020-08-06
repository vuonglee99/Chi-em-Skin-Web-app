import { Component, OnInit, Injector, Input } from '@angular/core';
import {Product} from '../../../core/model/product.model';
import {Question} from '../../../core/model/question.model';
import {Cart} from '../../../core/model/cart.model';
import { AppComponentBase } from '../../../core/app.component.base';
import {ActivatedRoute} from '@angular/router'
import { User } from 'app/core/model/user.model';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent extends AppComponentBase implements OnInit {

    currentProduct: Product = new Product();
    quantityPurchased:number=0;
    questionInput:Question=new Question;
    cartInput:Cart =new Cart();
    totalQuestion:number=0;

    isBusy: boolean = false;
    ngOnInit() {
        this.getCurrentUser();
        this.currentProduct.PRODUCT_ID=this.route.snapshot.paramMap.get("product_Id");
        this.getCurrentProduct();
        this.getProductQuestion();
    }

    constructor(
        injector: Injector,
        private route:ActivatedRoute,
    ) {
        super(injector);
        this.wowService.init();
    }

    getCurrentProduct(){
        this.isBusy=true;
        this.productService.getProductDetail(this.currentProduct.PRODUCT_ID).subscribe(res =>{
            this.currentProduct=res["data"][0];
            this.isBusy=false;
            this.titleService.setTitle(this.currentProduct.PRODUCT_NAME);

            for (var property in this.currentProduct) {
                this.cartInput[property]=this.currentProduct[property];               
            }
        });
    }

    getProductQuestion(){
        this.productService.getProductQuestion(this.currentProduct.PRODUCT_ID).subscribe(res =>{
            this.totalQuestion=res["data"].length;
        });
    }

    addQuestion(){
        this.isBusy=true;
        console.log(this.questionInput.QUESTION_CONTENT);
        this.questionInput.PRODUCT_ID=this.currentProduct.PRODUCT_ID;
        this.questionInput.QUESTION_TIME=this.getDate(new Date());
        this.productService.addQuestion(this.questionInput).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=="0"){
                this.toastService.addSingle('success','', "Nhận xét sản phẩm thành công!") ;
                this.redirectTo('/product/detail/',this.currentProduct.PRODUCT_ID);
            }else{
                this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
            }
        })
    }

    addToCart(){
        this.isBusy=true;
        this.cartInput.PRODUCT_AMOUNT=this.quantityPurchased;
         this.cartInput.USER_ID=this.currentUser.USER_ID;
        // this.cartInput.PRODUCT_TOTAL=this.cartInput.PRODUCT_TOTAL-this.quantityPurchased;
        this.cartInput.PRODUCT_TOTAL=this.currentProduct.PRODUCT_TOTAL;
        console.log(this.cartInput.PRODUCT_TOTAL);
         this.productService.addToCart(this.cartInput).subscribe(res =>{
             this.isBusy=false;
             if(res["data"].RESULT=="0"){
                 this.currentProduct.PRODUCT_TOTAL-=this.quantityPurchased;
                 this.addProductToSession(this.quantityPurchased);
                 this.quantityPurchased=0;
                 this.toastService.addSingle('success', '', 'Thêm vào giỏ hàng thành công.');
                 this.redirectTo('/product/detail/',this.currentProduct.PRODUCT_ID);
                 
             }else{
                 this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
             }
         })
    }

    updateQuantityPurchased(quantity:number){
        this.quantityPurchased+=quantity;
        this.currentProduct.PRODUCT_TOTAL-=quantity;
    }

    updateProduct() {
        this.isBusy=true;
        (this.totalQuestion==0)?this.currentProduct.PRODUCT_RATING=this.questionInput.PRODUCT_RATING:
        (this.currentProduct.PRODUCT_RATING=(this.currentProduct.PRODUCT_RATING + this.questionInput.PRODUCT_RATING)/2);
        this.productService.updateProduct(this.currentProduct).subscribe(res =>{
            this.isBusy=false;
         if(res["data"].RESULT=="0")
            {
                this.addQuestion();
            }
         else
             this.toastService.addSingle('error','', res["data"].ERROR_DESC) ;
         
        })
        
    }

    add(event) {
        if (event.keyCode == 13) {
           this.updateProduct();
        }

    }
}