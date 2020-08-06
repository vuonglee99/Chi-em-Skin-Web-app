import { Component, OnInit, Injector, Input } from '@angular/core';
import {Product} from '../../../core/model/product.model';
import {ProductType} from '../../../core/model/product-type.model';
import { AppComponentBase } from '../../../core/app.component.base';


@Component({
    selector: 'app-product-menu',
    templateUrl: 'product-menu.component.html'
})
export class ProductMenuComponent extends AppComponentBase implements OnInit {

    @Input() productType:string=null;
    @Input() activeItem:string=null;

    productTypeList: ProductType[] = [];
    productTypeInput: ProductType = new ProductType();

    ngOnInit() {
        this.getAllProductTypes();
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);

    }

    getAllProductTypes() {
        this.productService.getAllProductType(this.productTypeInput).subscribe(res => {
            this.productTypeList =  res["data"];
        });
    }

}