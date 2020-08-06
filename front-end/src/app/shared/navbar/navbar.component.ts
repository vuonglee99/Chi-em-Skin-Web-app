import { Component, OnInit, ElementRef,ViewChild,Injector } from '@angular/core';
import { Location} from '@angular/common';
import {ProductType} from '../../core/model/product-type.model';
import {Product} from '../../core/model/product.model';
import {User} from '../../core/model/user.model';
import {UserContextService} from '../../core/services/user-context.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {AppComponentBase} from '../../core/app.component.base';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends AppComponentBase implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    currentUser:User=new User();
    unAuth:boolean=true;
    productNameInput:string=null;
    productNameList:string[]=[];
    productInput:Product=new Product();

    productTypeList: ProductType[] = [];
    productTypeInput: ProductType = new ProductType();

    @ViewChild('instance', {static: true}) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();


    constructor(
        private injector:Injector,
        public location: Location,
         private element : ElementRef,
         ) {
        super(injector);
        this.sidebarVisible = false;

    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.currentUser=this.sessionService.getItem('currentUser');
        (!this.currentUser)?(this.unAuth=true):(this.unAuth=false);
        console.log(this.currentUser);
        this.getAllProductTypes();
        this.getAllProductNames();
        //this.getCart();
        this.totalProducts=this.sessionService.getItem('totalProduct');
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;
    
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
          map(term => (term === '' ? this.productNameList
            :this.productNameList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
      }


    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
  
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    getAllProductTypes() {
        this.productService.getAllProductType(this.productTypeInput).subscribe(res => {
            this.productTypeList =  res["data"];
        });
    }

    logOut(){
        this.currentUser=null;
        this.unAuth=true;
        this.userContextService.logout();
        location.reload();
    }

    searchProductByName(event) {
        if (event.keyCode == 13 && this.productNameInput !=null){
            this.redirectTo('/product/byName/',this.productNameInput);
        }
    }

    getAllProductNames(){
        this.productService.getAllProducts(this.productInput).subscribe(res =>{
            for(var i=0;i<res["data"].length;i++){
                this.productNameList.push(res["data"][i].PRODUCT_NAME);
            }
            console.log(this.productNameList[0]);
        })
    }

    // getCart() {
    //     this.productService.getCart(this.currentUser.USER_ID).subscribe(res => {
    //       this.totalProducts = res["data"].length;
    //      this.sessionService.setItem('totalProduct',this.totalProducts);
    //     })
    //   }

}
