import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerOverlayModule} from '../shared/spinner/spinner-overlay.module';
import {SharedModule} from '../shared/spinner/shared.module';
import {RegisterComponent} from './register/register.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';


@NgModule({
    imports: [
        SpinnerOverlayModule,
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        }),
        NgBootstrapFormValidationModule
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ExamplesComponent,
        ProfileComponent,
        RegisterComponent
    ]
})
export class ExamplesModule { }
