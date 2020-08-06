import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../core/app.component.base';
import { UserContextService } from '../../core/services/user-context.service';
import { User } from '../../core/model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent extends AppComponentBase implements OnInit {

    data: Date = new Date();
    focus;
    focus1;
    newUser: User = new User();
    registerForm: FormGroup;
    isBusy: boolean = false;
    dateInput: string = null;
    phonenumber: number = null;

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.registerForm = new FormGroup({
            'NAME': new FormControl('', [Validators.required, Validators.minLength(2)]),
            'USER_NAME': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            'USER_EMAIL': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
            'USER_BIRTHDAY': new FormControl('', [Validators.required]),
            'USER_PHONENUMBER': new FormControl(Number, [Validators.required, Validators.minLength(6)]),
            'USER_PASSWORD': new FormControl(Number, [Validators.required, Validators.minLength(6)]),
            'USER_ADDRESS': new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)])
        });
        this.wowService.init();
    }
    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        this.newUser.USER_GENDER='nam';
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    register() {
        if (!this.registerForm.invalid) {
            this.isBusy = true;
            this.newUser.USER_BIRTHDAY = this.strToDate(this.dateInput);
            this.newUser.USER_PHONENUMBER = '0' + String(this.phonenumber);
            console.log(this.newUser);
            this.userDataService.register(this.newUser).subscribe(res => {
                this.isBusy=false;
                if (res["data"].RESULT == "0") {
                    this.notificationService.showSuccess('Đăng kí tài khoản thành công', 'Thông báo');
                    this.redirectTo('/account/login', '');
                }
                else if (res["data"].RESULT == "-1") {
                    this.notificationService.showError(res["data"].ERROR_DESC, 'Lỗi');
                }
            });
        }else this.notificationService.showError('Vui lòng điền đủ thông tin!','Lỗi');
    }
}
