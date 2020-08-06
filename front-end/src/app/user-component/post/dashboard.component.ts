import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../core/app.component.base';


@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends AppComponentBase implements OnInit {

    isBusy: boolean = false;
   

    
    ngOnInit() {
    this.titleService.setTitle('Bảng tin');
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.wowService.init();
    }

    
   

}