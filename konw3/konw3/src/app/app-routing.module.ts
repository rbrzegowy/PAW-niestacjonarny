import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DyrektywyComponent } from './dyrektywy/dyrektywy.component';
import { StyleComponent } from './style/style.component';

const routes: Routes = [
  { path: 'dyrektywy', component: DyrektywyComponent },
  { path: 'style', component: StyleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'style' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
