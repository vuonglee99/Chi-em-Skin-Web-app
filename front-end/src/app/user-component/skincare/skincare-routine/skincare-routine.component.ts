import { Component, OnInit,Injector } from '@angular/core';
import {AppComponentBase} from '../../../core/app.component.base';
import { Routine } from '../../../core/model/routine.module';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-skincare-routine',
    templateUrl: 'skincare-routine.component.html',
})
export class SkincareRoutineComponent extends AppComponentBase implements OnInit {
    
    routineList:Routine[]=[];
    currentRoutine:Routine=new Routine();
    editCurrentRoutine:Routine=new Routine();

    image=null;
    editting:boolean=false;
    closeResult: string;
    isBusy: boolean = false;
    constructor(
        private injector:Injector,
        private modalService: NgbModal
    ){
        super(injector);
        this.wowService.init();
    }
    
    ngOnInit() {
        this.checkAuth();
        if(!this.currentUser) return;
        this.getRoutines();
    }

    getRoutines(){
        this.isBusy=true;
        this.skincareService.getSkinRoutine(this.currentUser.USER_ID).subscribe(res =>{
            this.isBusy=false;
            this.routineList=res["data"];
            if(this.routineList.length==0){
                this.notificationService.showWarning( 'Bạn phải thực hiện bài kiểm tra da trước.','Thông báo');
                this.redirectTo('/skincare/skintest/','');
                return;
            }

            for (var i = 0; i < this.routineList.length; i++) {
                for (var j = i + 1; j < this.routineList.length; j++) {
                  if (this.routineList[i].ROUTINE_NUMBER > this.routineList[j].ROUTINE_NUMBER) {
                    let routine: Routine = this.routineList[i];
                    this.routineList[i] = this.routineList[j];
                    this.routineList[j] = routine;
                  }
                }
              }
        });
    }


    open(content, type, modalDimension,routine:Routine) {
        this.currentRoutine=routine;
        console.log( this.currentRoutine);
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension == undefined && type === 'Login') {
          this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
  
    searchProductByName(){
        this.modalService.dismissAll();
        this.redirectTo('/product/byName/',this.currentRoutine.ROUTINE_PRODUCT);
    }
    
    enableEditRoutine(){
        this.editting=!this.editting;
        this.image=null;
        for(var property in this.currentRoutine){
            this.editCurrentRoutine[property]=this.currentRoutine[property];
        }
    }

    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }
    }

    saveEditRoutine(){
        this.isBusy=true;
        this.skincareService.updateRoutine(this.editCurrentRoutine).subscribe(res => {
            this.isBusy = false;
            if (res["data"].RESULT == "0") {
              if (this.image !=null) {
                this.isBusy = true;
                this.skincareService.updateRoutineImage(this.editCurrentRoutine.USER_ROUTINE_ID, this.image, null).subscribe(res => {
                  this.isBusy = false;
                  if (res["data"].RESULT == "0") {
                    this.notificationService.showSuccess('Thay đổi thông tin dưỡng da thành công','Thông báo');
                    this.modalService.dismissAll();
                    this.redirectTo('/skincare/routine','');
                  } else {
                    this.notificationService.showError(res["data"].ERROR_DESC,'Lỗi');
                  }
                })
              } else {
                this.notificationService.showSuccess('Thay đổi thông tin dưỡng da thành công','Thông báo');
                this.modalService.dismissAll();
                this.redirectTo('/skincare/routine','');
            }
      
            } else {
                this.notificationService.showError(res["data"].ERROR_DESC,'Lỗi');
            }
          });
    }
}
