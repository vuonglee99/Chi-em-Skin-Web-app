import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import { FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import {Notice} from '../../../core/model/notice.model';

@Component({
    selector: 'app-supporting',
    templateUrl: 'supporting.component.html'
})
export class SupportingComponent extends AppComponentBase implements OnInit {

    supportingForm:FormGroup;
    noticeInput:Notice=new Notice();

    isBusy: boolean = false;
    ngOnInit() {
        this.checkAuth();
        if(this.unAuth) return;
        this.noticeInput.USER_ID=this.currentUser.USER_ID;
        this.noticeInput.NOTICE_FROM=this.currentUser.USER_NAME;
        this.noticeInput.NOTICE_DATE=this.getDate(new Date());
    }

    constructor(
        injector: Injector,
        

    ) {
        super(injector);
        this.supportingForm = this.formBuilder.group({
            'NOTICE_FROM': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            'NOTICE_TITLE': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            'NOTICE_CONTENT': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
            'EMAIL': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),

        });
        this.wowService.init();
    }


    addNotice(){
        this.isBusy=true;
        this.supportingService.addNotice(this.noticeInput).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=="0"){
                this.noticeInput.NOTICE_CONTENT=this.noticeInput.NOTICE_TITLE="";
                this.notificationService.showSuccess('Gửi yêu cầu hỗ trợ thành công','Thông báo');

            }else this.notificationService.showError('Gửi yêu cầu hỗ trợ thất bại' + res["data"].ERROR_DESC,'Lỗi');
        })
    }
   

   

    

    
}