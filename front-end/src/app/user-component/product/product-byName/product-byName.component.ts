import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProductType } from '../../../core/model/product-type.model';
import { AppComponentBase } from '../../../core/app.component.base';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/core/model/product.model';


@Component({
    selector: 'app-product-by-name',
    templateUrl: 'product-byname.component.html'
})
export class ProductByNameComponent extends AppComponentBase implements OnInit {

    isBusy: boolean = false;
    isEmpty: boolean = true;
    productTypeInput: ProductType = new ProductType();
    productInput:Product=new Product();
    productList:Product[]=[];
    productTypeId: any = null;

    ngOnInit() {
        this.productInput.PRODUCT_NAME = this.route.snapshot.paramMap.get("product_Name");
        console.log(this.productInput.PRODUCT_NAME);
        this.titleService.setTitle(" Sản phẩm cho '"+this.productInput.PRODUCT_NAME+"'");
        this.getCurrentProducts();

    }

    imageObject:string[]=[
        'assets/img/brand/Innisfree_brand.jpg',
        'assets/img/brand/laneige-brand.png',
        'assets/img/brand/laroche-posay-brand.png',
        'assets/img/brand/Loreal-Paris-brand.png',
        "assets/img/brand/paulas-choice-brand.png",
        'assets/img/brand/vichy-brand.png',
    ]
    constructor(
        injector: Injector,
        private route: ActivatedRoute
    ) {
        super(injector);
        this.wowService.init();
    }

    

    getCurrentProducts(){
        this.isBusy=true;
        this.productService.getAllProducts(this.productInput).subscribe(res =>{
            this.isBusy=false;
            this.productList=res["data"];
            (this.productList.length==0) ?this.isEmpty=true:this.isEmpty=false;
        })
    }
}