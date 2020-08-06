import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';;
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-side-menu',
    templateUrl: 'post-side-menu.component.html'
})
export class PostSideMenuComponent extends AppComponentBase implements OnInit {

    @Input() active:string="";

    ngOnInit() {
      this.getCurrentUser();
      if(!this.currentUser) this.unAuth=true; else this.unAuth=false;
    }


    constructor(
        injector: Injector,
        
    ) {
        super(injector);
        this.wowService.init();
    }

}