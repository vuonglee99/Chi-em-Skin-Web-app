import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import {Question} from '../../../core/model/question.model';
import {ActivatedRoute} from '@angular/router';
import {Tip} from '../../../core/model/tip.model';


@Component({
    selector: 'app-tip-detail',
    templateUrl: 'tip-detail.component.html'
})
export class TipDetailComponent extends AppComponentBase implements OnInit {

    currentTip: Tip=new Tip();
    questionInput:Question=new Question;

    isShowComment:boolean=false;
    isBusy: boolean = false;
    ngOnInit() {
        this.getCurrentUser();
        this.currentTip.TIP_ID=this.route.snapshot.paramMap.get("tip_Id");
        this.getCurrentTip();
    }

    constructor(
        injector: Injector,
        private route :ActivatedRoute,

    ) {
        super(injector);
        this.wowService.init();
    }

    getCurrentTip() {
        this.isBusy = true;
        this.postService.getAllTips(this.currentTip).subscribe(res => {
            this.currentTip= res["data"][0];
            this.titleService.setTitle("'"+this.currentTip.TIP_TITLE+"'");
            this.isBusy = false;
        })
    }

    addComment(event) {
        if (event.keyCode == 13 && this.questionInput.QUESTION_CONTENT !="") {
            this.isBusy=true;
        this.questionInput.PRODUCT_ID=this.currentTip.TIP_ID;
        this.questionInput.QUESTION_TIME=this.getDate(new Date());
        this.productService.addQuestion(this.questionInput).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=="0"){
                this.redirectTo('/post/tip-detail/',this.currentTip.TIP_ID);
                
            }else{
                this.notificationService.showError(res["data"].ERROR_DESC,'Lỗi');
            }
        })
        }

    }

    showComment(index: number) {
        this.isShowComment=!this.isShowComment;
        
    }
}