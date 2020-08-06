import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';


@Component({
    selector: 'app-my-post',
    templateUrl: 'my-post.component.html'
})
export class MyPostComponent extends AppComponentBase implements OnInit {

    isBusy: boolean = false;
   
    ngOnInit() {
        this.checkAuth();
        this.isMaker=true;
        this.titleService.setTitle('Bảng tin');
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.wowService.init();
    }

    
   

}