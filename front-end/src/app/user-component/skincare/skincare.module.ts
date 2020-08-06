import { NgModule } from '@angular/core';
import {SpinnerOverlayModule} from '../../shared/spinner/spinner-overlay.module';
import {SharedModule} from '../../shared/spinner/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {ProductService} from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import {NgPrimeModule} from '../../app.primeNg.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SkincareRoutingModule} from './skincare.routing';
import {SkinTestComponent} from './skin-test/skin-test.component';
import {SkincareMenuComponent} from './skincare-menu/skincare-menu.component';
import {AppModule} from '../../app.module';
import {SkinInfoComponent} from './skin-info/skin-info.component';
import {SkincareRoutineComponent} from './skincare-routine/skincare-routine.component';

@NgModule({
    imports: [
      NgbModule,
      JwBootstrapSwitchNg2Module,
      ReactiveFormsModule,
      NouisliderModule,
      NgPrimeModule,
      CommonModule,
      FormsModule,
      SpinnerOverlayModule,
      SharedModule,
      SkincareRoutingModule
    ],
    declarations: [
      SkinTestComponent,
      SkincareMenuComponent,
      SkinInfoComponent,
      SkincareRoutineComponent
    ],
  
    providers:[
      
    ],
    exports:[
      
    ]
  })
  export class SkincareModule { }
  