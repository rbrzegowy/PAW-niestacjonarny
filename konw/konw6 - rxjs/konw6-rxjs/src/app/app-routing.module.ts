import { NgModule } from '@angular/core'
import { DashboardComponent } from './app-components/dashboard/dashboard.component'
import { RouteDataPreloadingStrategy } from './helpers/route-data-preloading-strategy'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  // route do komponentu
  {
    path: '',
    component: DashboardComponent,
  },
  // lazy load
  {
    // http://localhost:4200/rxjs/hot-cold
    path: 'rxjs',
    loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxjsModule)
  },

  {
    path: 'piaskownica',
    loadChildren: () => import('./piaskownica/piaskownica.module').then(m => m.PiaskownicaModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    RouteDataPreloadingStrategy,
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomRouteReuseStrategy
    // }
  ]
})
export class AppRoutingModule {}
