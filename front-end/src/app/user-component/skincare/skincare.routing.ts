import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SkinTestComponent} from './skin-test/skin-test.component';
import {SkinInfoComponent} from './skin-info/skin-info.component';
import {SkincareRoutineComponent} from './skincare-routine/skincare-routine.component';


const routes: Routes = [
  {
    path: 'skintest',
    component:SkinTestComponent ,
    data: {
      title: 'Bài kiểm tra da'
    }
  },
  {
    path: 'skininfo',
    component:SkinInfoComponent ,
    data: {
      title: 'Bài kiểm tra da'
    }
  },
  {
    path: 'routine',
    component:SkincareRoutineComponent ,
    data: {
      title: 'Quy trình dưỡng da'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkincareRoutingModule {}
