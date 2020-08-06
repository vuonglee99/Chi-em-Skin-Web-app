import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';;
import {SkinTest} from '../../../core/model/skin-test.model';
import {TestResult} from '../../../core/model/test-result.model';

@Component({
    selector: 'app-skin-test',
    templateUrl: 'skin-test.component.html'
})
export class SkinTestComponent extends AppComponentBase implements OnInit {


    isBusy: boolean = false;
    isFinish:boolean=false;
    isTesting:boolean=false;
    value: number = 0;

    skinTestModel: SkinTest=new SkinTest();
    skinTests: SkinTest[];
    skinTest:SkinTest;
    totalQs:number;
    currentQs:number;
    testResult:TestResult=new TestResult();
    ngOnInit() {
      this.checkAuth();
      if(!this.currentUser) return;
      this.getSkinTest();
      this.testResult.TESTRESULT_USER_ID=this.currentUser.USER_ID;

    }


    constructor(
        injector: Injector,
        
    ) {
        super(injector);
        this.wowService.init();
    }
    getSkinTest(){
        this.isBusy=true;
        this.skincareService.getSkinTests(this.skinTestModel).subscribe(res =>{
            this.isBusy=false;
            this.skinTests=res["data"];
            this.skinTest=this.skinTests[0];
            this.totalQs=this.skinTests.length;
            this.currentQs=0;
            this.testResult.TESTRESULT_QUESTION=this.skinTest.SKINTEST_QUESTION;
            this.testResult.TESTRESULT_ANSWER='Da khô nhạy cảm';
        })
    }

    showPreQuestion(){
        if(this.currentQs>0){
            this.value-=(100/(this.totalQs-1));
            this.isFinish=false;
            this.currentQs-=1;
            this.skinTest=this.skinTests[this.currentQs];
        }
    }

    showNextQuestion(){
        if(this.currentQs<this.totalQs-1){
            this.currentQs+=1;
            this.skinTest=this.skinTests[this.currentQs];
            this.value+=(100/(this.totalQs-1));
        }
         if(this.currentQs==this.totalQs-1){
            this.isFinish=true;
        }
    }

    answer(ans:any){
        if(this.currentQs==0)
        {
            this.testResult.TESTRESULT_ANSWER=ans;
        }
    }
    
    startTest(){
        this.isTesting=true;
    }

    submitTest(){
        this.isBusy=true;
        this.skincareService.submitTestResult(this.testResult).subscribe(res =>{
            if(res["data"].RESULT=="0"){
                this.isBusy=false;
                this.notificationService.showSuccess("Hoàn thành bài kiểm tra",'Thông báo');
                this.redirectTo('/skincare/skininfo/','');
            }
        })
        
    }

}