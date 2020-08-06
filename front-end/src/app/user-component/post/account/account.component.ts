import { Component, OnInit, Injector, Input } from '@angular/core';
import { PostDataService } from '../../../core/services/post-data.service';
import { AppComponentBase } from '../../../core/app.component.base';
import {User} from '../../../core/model/user.model';
import { FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html'
})
export class AccountComponent extends AppComponentBase implements OnInit {

    editUserForm:FormGroup;
    editUser:User=new User();
    image: any = null;
    dateInput:string=null;

    imgURL: any;
    public message: string;
    isBusy: boolean = false;
    ngOnInit() {
        this.checkAuth();
        if(this.unAuth) return;
        this.setEditUser();
    }

    constructor(
        injector: Injector,
        

    ) {
        super(injector);
        this.editUserForm = this.formBuilder.group({
            'USER_ADDRESS': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            'USER_PHONENUMBER': new FormControl(Number, [Validators.required]),
            'USER_NAME': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            'USER_EMAIL': new FormControl('', [Validators.required, Validators.email]),
        });
        this.wowService.init();
    }
   

    preview(files) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.image = files;
        console.log(this.image);
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    updateUser(){
        if(!this.editUserForm.invalid&&this.dateInput!=null){
            this.isBusy=true;
            this.editUser.USER_BIRTHDAY=this.strToDate(this.dateInput);
            this.userDataService.update(this.editUser).subscribe(res =>{
                this.isBusy=false;
                if(res["data"].RESULT== "0")
                {
                    if(this.image!=null)
                    {
                        this.userDataService.addAvatar(this.editUser.USER_ID,this.image).subscribe(response =>{
                            this.isBusy=false;
                            if(response["data"]!="-1"){
                                this.notificationService.showSuccess('Sửa đổi thông tin thành công.',"Thông báo");
                                this.editUser.USER_AVATAR=response["data"].USER_AVATAR;
                                this.sessionService.setItem("currentUser",this.editUser);
                            }else{
                                this.notificationService.showError(response["data"].ERROR_DESC,"Lỗi");
                                this.editUser=this.sessionService.getItem("currentUser");
                            }
                        });
                        
                    }else{
                        this.isBusy=false;
                        this.notificationService.showSuccess('Sửa đổi thông tin thành công.',"Thông báo");
                        this.sessionService.setItem("currentUser",this.editUser);
                    }
                }
                else if(res["data"].RESULT== "-1"){
                    this.notificationService.showError(res["data"].ERROR_DESC,"Lỗi");
                    this.editUser=this.sessionService.getItem("currentUser");
                }
            });
            this.getCurrentUser();
        }else this.notificationService.showError('Hoàn thành các trường dữ liệu yêu cầu!','Lỗi');
    }

    setEditUser(){
        for (var property in this.currentUser) {
            this.editUser[property] = this.currentUser[property];
        }
        this.image=null;
        this.imgURL = this.currentUser.USER_AVATAR;
        this.dateInput=this.getDate2(this.currentUser.USER_BIRTHDAY);
    }
}