import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HigherOrderObservablesComponent } from './higher-order-observables/higher-order-observables.component';
import { HotColdObservableComponent } from './hot-cold-observable/hot-cold-observable.component';
import { ManyObservablesComponent } from './many-observables/many-observables.component';
import { ObservablesComponent } from './observables/observables.component';
import { RxjsDashboardComponent } from './rxjs-dashboard/rxjs-dashboard.component';
import { SchedulersComponent } from './schedulers/schedulers.component';

const routes: Routes = [
  {
    path: '',
    title: 'RxJS',
    component: RxjsDashboardComponent,
    children: [
      {
        path: 'observables',
        title: 'Observables - podstawy',
        component: ObservablesComponent
      },
      {
        path: 'hot-cold',
        title: 'Hot & Cold observables',
        component: HotColdObservableComponent
      },
      {
        path: 'many',
        title: 'Praca z wieloma strumieniami',
        component: ManyObservablesComponent
      },
      {
        path: 'higher-order-observables',
        title: 'Higher-order observables',
        component: HigherOrderObservablesComponent
      },
      {
        path: 'schedulers',
        title: 'Schedulers',
        component: SchedulersComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule {}
