import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BrowserModule, Title } from '@angular/platform-browser';
import { SpinnerOverlayModule } from '../app/shared/spinner/spinner-overlay.module';
import { SharedModule } from '../app/shared/spinner/shared.module';
import { ToastModule } from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'angular-image-slider';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from "../app/shared/custom-errors";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NgwWowModule } from 'ngx-wow';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        NgwWowModule,
        MessagesModule,
        MessageModule,
        ReactiveFormsModule,
        CommonModule,
        ToastModule,
        SharedModule,
        SpinnerOverlayModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        NgImageSliderModule,
        SliderModule,
        ToastrModule.forRoot(),
        NgBootstrapFormValidationModule.forRoot()

    ],
    providers: [
        HttpClientModule,
        DialogService,
        ConfirmationService,
        MessageService,

        Title,
        {
            provide: CUSTOM_ERROR_MESSAGES,
            useValue: CUSTOM_ERRORS,
            multi: true
        }
    ],
    exports:[
        MessageModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
