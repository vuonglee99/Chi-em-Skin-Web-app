import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import {ProductModule} from '../user-component/product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import {SpinnerOverlayModule} from '../shared/spinner/spinner-overlay.module';
import {SharedModule} from '../shared/spinner/shared.module';

import {ProductService} from '../core/services/product.service';
import { SliderModule } from 'angular-image-slider';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
    imports: [
        NgImageSliderModule,
        SpinnerOverlayModule,
        SharedModule,
        HttpClientModule,
        ProductModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        SliderModule
      ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalBasic
    ],
    providers:[
        MessageService,
        ProductService
    ],

    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
