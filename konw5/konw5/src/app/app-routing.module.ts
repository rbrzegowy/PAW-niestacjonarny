import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { ProductsDasboardComponent } from './products-dasboard/products-dasboard.component'
import { ProductsListComponent } from './products-list/products-list.component'
import { ProductComponent } from './product/product.component'
import { ProductsContainerComponent } from './products-container/products-container.component'
import { UserGuard } from './user.guard'
import { UserTypes } from './user-types.enum'

const routes: Routes = [
  {
    path: 'user',
    data: {
      allowedUsers: [UserTypes.editor, UserTypes.standard]
    },
    canActivate: [UserGuard],
    component: UserProfileComponent
  },
  // /products - dashboard
  // /products/list - products list
  // /products/view/:id - product
  // { path: 'products', component: ProductsDasboardComponent },
  // { path: 'products/list', component: ProductsListComponent },
  // { path: 'products/view/:id', component: ProductComponent },
  {
    path: 'products',
    data: {
      allowedUsers: [UserTypes.editor]
    },
    canActivate: [UserGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
