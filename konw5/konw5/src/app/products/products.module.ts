import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductComponent } from '../product/product.component'
import { ProductsContainerComponent } from '../products-container/products-container.component'
import { ProductsDasboardComponent } from '../products-dasboard/products-dasboard.component'
import { ProductsListComponent } from '../products-list/products-list.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: ProductsContainerComponent,
    children: [
      { path: '', component: ProductsDasboardComponent },
      { path: 'list', component: ProductsListComponent },
      {
        path: 'view/:id',
        data: { title: 'Super produkt' },
        component: ProductComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    ProductsDasboardComponent,
    ProductsListComponent,
    ProductComponent,
    ProductsContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule {}
