import { Component, OnInit, Injector, Input,ViewChild } from '@angular/core';
import { ProductType } from '../../../core/model/product-type.model';
import { AppComponentBase } from '../../../core/app.component.base';
import { ActivatedRoute } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';



@Component({
    selector: 'app-product-search',
    templateUrl: 'product-search.component.html'
})
export class ProductSearchComponent extends AppComponentBase implements OnInit {

    isBusy: boolean = false;
    isEmpty: boolean = true;
    productTypeInput: ProductType = new ProductType();
    @ViewChild('nav') slider: NgImageSliderComponent;

    imageObject: Array<object> =null;

    productTypeId: any = null;

    ngOnInit() {
        this.imageObject=this.imageService.getBrandImageObject();
        this.productTypeInput.PRODTYPE_NAME = this.route.snapshot.paramMap.get("productType_Id");
        this.getProductType();
       

    }

    constructor(
        injector: Injector,
        private route: ActivatedRoute
    ) {
        super(injector);
        this.wowService.init();
    }

    getProductType() {
        this.isBusy = true;
        this.productService.getAllProductType(this.productTypeInput).subscribe(res => {
            this.isBusy = false;
            for (var i = 0; i < res['data'].length; i++) {
                if (res['data'][i].PRODTYPE_ID == this.productTypeInput.PRODTYPE_ID) {
                    this.productTypeInput = res['data'][i];
                }
            }
            this.titleService.setTitle("'"+this.productTypeInput.PRODTYPE_NAME+"'");
        })
    }
}