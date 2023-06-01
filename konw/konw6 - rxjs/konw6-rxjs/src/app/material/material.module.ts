import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatBadgeModule } from '@angular/material/badge'
import { MatInputModule } from '@angular/material/input'
import { MatChipsModule } from '@angular/material/chips'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

const MatModules = [
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatBadgeModule,
  MatInputModule,
  MatChipsModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MatModules
  ],
  exports: [
    ...MatModules
  ]
})
export class MaterialModule {}
