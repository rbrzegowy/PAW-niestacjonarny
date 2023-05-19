import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PiaskownicaRoutingModule } from './piaskownica-routing.module'
import { PiaskownicaComponent } from './piaskownica/piaskownica.component'
import { MaterialModule } from '../material/material.module'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    PiaskownicaComponent,
  ],
  imports: [
    CommonModule,
    PiaskownicaRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    PiaskownicaComponent
  ]
})
export class PiaskownicaModule {}
