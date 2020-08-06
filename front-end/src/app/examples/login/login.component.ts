import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../core/app.component.base';
import { UserContextService } from '../../core/services/user-context.service';
import {User} from '../../core/model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserDataService} from '../../core/services/user-data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppComponentBase implements OnInit {

    data: Date = new Date();
    focus;
    focus1;
    userLogin:User=new User()
    currentUser:User=new User();
    loginForm:FormGroup;
    isBusy:boolean=false;

    constructor(
        injector: Injector
    ) 
    {
        super(injector);
        this.loginForm=this.formBuilder.group({
            'USER_NAME':new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
            'USER_PASSWORD':new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(100)])

        });
        this.wowService.init();
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    login(){
        this.isBusy=true;
        this.userDataService.login(this.currentUser.USER_NAME,this.currentUser.USER_PASSWORD).subscribe(res =>{
            this.isBusy=false;
            if(res["data"] !="-1"){
                this.currentUser=res["data"];
                this.notificationService.showSuccess("Đăng nhập thành công","Thông báo");
                //this.toastService.addSingle('success','','Đăng nhập thành công!');
                this.userContextService.setUser(this.currentUser);
                location.href = "/index";                
            }else  this.notificationService.showError("Tài khoản hoặc mật khẩu không chính xác.","Lỗi");

        })
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

}
