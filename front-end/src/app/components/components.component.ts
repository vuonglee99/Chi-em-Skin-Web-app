import { Component, OnInit, Renderer2, OnDestroy, ViewChild, Injector,AfterViewInit} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ProductType } from '../core/model/product-type.model';
import { AppComponentBase } from '../core/app.component.base';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `],
    animations: [

      ]
})

export class ComponentsComponent extends AppComponentBase implements OnInit, OnDestroy,AfterViewInit {
    data: Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    date: { year: number, month: number };
    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;


    productTypeInput: ProductType = new ProductType();
    productTypeList: ProductType[] = [];

    @ViewChild('nav') slider: NgImageSliderComponent;

    imageObject: Array<object> = null;
    topImageObject: Array<object> = null;
    constructor(
        private injector: Injector,
        private renderer: Renderer2,
        config: NgbAccordionConfig,
    ) {
        super(injector);
        config.closeOthers = true;
        config.type = 'info';
        this.titleService.setTitle('Trang chủ');
        this.wowService.init();
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    ngOnInit() {
        //var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
        this.getAllProductTypes();
        this.imageObject = this.imageService.getBrandImageObject();
        this.topImageObject = this.imageService.getTopImageObject();
    }

    ngAfterViewInit(){
        new WOW().init();
    }
    ngOnDestroy() {
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    getAllProductTypes() {
        this.productService.getAllProductType(this.productTypeInput).subscribe(res => {
            this.productTypeList = res["data"];
        });
    }
}
