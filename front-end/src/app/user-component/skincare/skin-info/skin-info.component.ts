import { Component, OnInit,Injector } from '@angular/core';
import {AppComponentBase} from '../../../core/app.component.base';
import {SkinTest} from '../../../core/model/skin-test.model';;
import {SkinType} from '../../../core/model/skin-type.model';
import {SkinInfo} from '../../../core/model/skin-info.model';


@Component({
    selector: 'app-skin-info',
    templateUrl: 'skin-info.component.html',
})
export class SkinInfoComponent extends AppComponentBase implements OnInit {
    
    isBusy: boolean = false;
    isDetail:boolean=false;
    isDetail1:boolean=false;
    isDetail2:boolean=false;
    isDetail3:boolean=false;
    isDetail4:boolean=false;

    skinType:SkinType;
    skinInfo:SkinInfo;
    constructor(
        private injector:Injector
    ){
        super(injector);
        this.wowService.init();
    }
    
    ngOnInit() {
        this.checkAuth();
        if(!this.currentUser) return;
        this.getSkinInfo();

    }

    

    getSkinInfo(){
        this.isBusy=true;
        this.skincareService.getSkinInfo(this.currentUser.USER_ID).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT != "-1"){
                this.skinType=res["data"][0];
            }else{
                this.notificationService.showError( 'Bạn phải thực hiện bài kiểm tra da trước.','Lỗi');
                this.redirectTo('/skincare/skintest/','');
            }
        });
    }

    showDetail(index:string){
        this.isDetail=true;
        this.isDetail1=false;
        this.isDetail2=false;
        this.isDetail3=false;
        this.isDetail4=false;
        switch(index)
        {
            case "1":
                this.isDetail1=true;
                break;
            case "2":
                this.isDetail2=true;
                break;
            case "3":
                this.isDetail3=true;
                break;
            case "4":
                this.isDetail4=true;
                break;
        }
    }

    cancelDetail(){
        this.isDetail=false;
    }
}
