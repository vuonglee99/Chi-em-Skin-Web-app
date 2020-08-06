import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';


@Component({
    selector: 'app-tip-dashboard',
    templateUrl: 'tip-dashboard.component.html'
})
export class TipDashboardComponent extends AppComponentBase implements OnInit {

    isBusy: boolean = false;
   

    
    ngOnInit() {
    this.titleService.setTitle('Mẹo dưỡng da');
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.wowService.init();
    }

    
   

}