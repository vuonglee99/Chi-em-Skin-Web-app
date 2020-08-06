import {SessionService} from './services/session.service';
import {RouteStateService} from '../core/services/route-state.service';
import {ToastService} from '../core/services/toast.service';
import { Injector } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Route,Router,ActivatedRoute} from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {Title} from "@angular/platform-browser";
import {User} from '../core/model/user.model';
import {OnInit} from '@angular/core';
import {NotificationService} from '../core/services/notification.service';
import {Location} from '@angular/common';
import {UserDataService} from './services/user-data.service';
import { UserContextService } from './services/user-context.service';
import {PostDataService} from './services/post-data.service';
import {ProductService} from './services/product.service';
import {SkincareDataService} from './services/skincare-data.service';
import {SupportingService} from '../core/services/supportingService';
import {ImageService}from '../core/services/image.service';
import { NgwWowService } from 'ngx-wow';
import { WOW } from 'wowjs/dist/wow.min';


export abstract class AppComponentBase implements OnInit{

    toastService:ToastService;
    routeStateService:RouteStateService;
    sessionService:SessionService;
    formBuilder:FormBuilder;
    router:Router;
    confirmationService:ConfirmationService;
    titleService:Title;
    currentUser:User=new User();
    unAuth:boolean=true;
    notificationService:NotificationService;
    isMaker:boolean=false;
    location:Location;
    userDataService:UserDataService;
    postService:PostDataService;
    productService:ProductService;
    skincareService:SkincareDataService;
    supportingService:SupportingService;
    totalProducts:number=0;
    imageService:ImageService;
    userContextService:UserContextService;
    wowService:NgwWowService;

    wow = new WOW(
        {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
      }
      )
    
    ngOnInit(){
        
    }

    constructor(injector:Injector){
        this.toastService=injector.get(ToastService);
        this.sessionService=injector.get(SessionService);
        this.toastService=injector.get(ToastService);
        this.formBuilder=injector.get(FormBuilder);
        this.router=injector.get(Router);
        this.confirmationService=injector.get(ConfirmationService);
        this.titleService=injector.get(Title);
        this.notificationService=injector.get(NotificationService);
        this.location=injector.get(Location);
        this.userDataService=injector.get(UserDataService);
        this.postService=injector.get(PostDataService);
        this.productService=injector.get(ProductService);
        this.skincareService=injector.get(SkincareDataService);
        this.supportingService=injector.get(SupportingService);
        this.imageService=injector.get(ImageService);
        this.userContextService=injector.get(UserContextService);
        this.wowService=injector.get(NgwWowService);
    }

    public getDate(dateInput: any): string {
        if (dateInput != null) {
            let d = new Date(Date.parse(dateInput));
            var dd = (d.getDate() < 10) ? dd = '0' + d.getDate() : dd = d.getDate();
            var mm = ((d.getMonth() + 1) < 10) ? mm = '0' + (d.getMonth() + 1) : mm = (d.getMonth() + 1);
            var yyyy = d.getFullYear();
            let myDate = dd + "/" + mm + "/" + yyyy;
            return String(myDate);
        } else return "";
    }

    redirectTo(uri: string, cate_id: any) {
        uri += "/" + cate_id;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([uri]));
    }

    public strToDate(dateInput: string): Date {
        let arr = dateInput.split("-", 3);
        var dd = parseInt(arr[2]);
        var mm = parseInt(arr[1]);
        var yyyy = parseInt(arr[0]);

        let date = new Date(yyyy, mm - 1, dd);
        return date;
    }

    getCurrentUser(){
        this.currentUser=this.sessionService.getItem("currentUser");
        (this.currentUser)?this.unAuth=false:this.unAuth=true;
    }

    checkAuth(){
        this.getCurrentUser();
        if(this.unAuth)
            this.redirectTo('/account/login', '');
    }

    getNextDate(nextDate:number):any{
        var today = new Date(new Date().getTime() + nextDate*24 * 60 * 60 * 1000);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //As January is 0.
        var yyyy = today.getFullYear();
        return (dd+"/"+mm+"/"+yyyy);
    }

    checkMaker(id:any){
        (this.currentUser.USER_ID===id)?this.isMaker= true:this.isMaker=false;
    }

    getDate2(dateInput: any): string {
        if (dateInput != null) {
            let d = new Date(Date.parse(dateInput));
            var dd = (d.getDate() < 10) ? dd = '0' + d.getDate() : dd = d.getDate();
            var mm = ((d.getMonth() + 1) < 10) ? mm = '0' + (d.getMonth() + 1) : mm = (d.getMonth() + 1);
            var yyyy = d.getFullYear();
            let myDate = yyyy + "-" + mm + "-" + dd;
            return String(myDate);
        } else return "";
    }

    addProductToSession(productQuantity:number){
        let totalProduct=0;
        totalProduct=this.sessionService.getItem('totalProduct');
        this.totalProducts=productQuantity+totalProduct;
        this.sessionService.setItem('totalProduct',this.totalProducts);
    }
}