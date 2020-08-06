import { Component, OnInit, Injector, Input } from '@angular/core';
import { Post } from '../../../core/model/post.model';
import { AppComponentBase } from '../../../core/app.component.base';
import {Question} from '../../../core/model/question.model';

import {Tip} from '../../../core/model/tip.model';


@Component({
    selector: 'app-tip-list',
    templateUrl: 'tip-list.component.html'
})
export class TipListComponent extends AppComponentBase implements OnInit {

    @Input() sortBy: any = null;
    @Input() isPaging: boolean = false;
    @Input() postOnRow: string="col-lg-12 col-md-12 col-sm-12";
    @Input() pageSize: number = 12;
    @Input() isMinToMax: boolean = false;
    @Input() userID: string = null;
    @Input() isMaker:boolean=false;

    tipList: Tip[] = [];
    tipInput: Tip = new Tip();
    questionInput:Question=new Question;


    isBusy: boolean = false;
    isEmpty: boolean = true;
    totalTip: number = 0;
    page=1;

    indexShow: number = -1;
    content: string = null;
    isShowComment:boolean=false;
    ngOnInit() {
        this.getCurrentUser();
        this.getAllTips();
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.wowService.init();
    }

    getAllTips() {
        this.isBusy = true;
        this.postService.getAllTips(this.tipInput).subscribe(res => {
            this.tipList = res["data"];
            console.log(res["data"]);
            this.totalTip = this.tipList.length;
            (this.totalTip == 0) ? this.isEmpty = true : this.isEmpty = false;
            if (this.sortBy != null) {
                for (var i = 0; i < this.totalTip; i++) {
                    for (var j = i + 1; j < this.totalTip; j++) {
                        if (this.isMinToMax == false) {
                            if (this.tipList[i][this.sortBy] < this.tipList[j][this.sortBy]) {

                                let tip: Tip = this.tipList[i];
                                this.tipList[i] = this.tipList[j];
                                this.tipList[j] = tip;
                            }
                        } else {
                            if (this.tipList[i][this.sortBy] > this.tipList[j][this.sortBy]) {

                                let tip: Tip = this.tipList[i];
                                this.tipList[i] = this.tipList[j];
                                this.tipList[j] = tip;
                            }
                        }

                    }
                }
            }
            this.isBusy = false;
        })
    }

    addComment(event,post:Post) {
        if (event.keyCode == 13 && this.questionInput.QUESTION_CONTENT !="") {
            this.isBusy=true;
        this.questionInput.PRODUCT_ID=post.POST_ID;
        this.questionInput.QUESTION_TIME=this.getDate(new Date());
        this.productService.addQuestion(this.questionInput).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=="0"){
                this.redirectTo('/post/','');
                
            }else{
                this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
            }
        })
        }

    }

    showComment(index: number) {
        (this.indexShow!=index)? this.isShowComment=true:this.isShowComment = !this.isShowComment;
        this.indexShow = index;
        this.questionInput.QUESTION_CONTENT="";
    }
   


}