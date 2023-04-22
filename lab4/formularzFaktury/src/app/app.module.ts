import { MatCardModule } from '@angular/material/card'
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'

import { registerLocaleData } from '@angular/common'
import localePl from '@angular/common/locales/pl'
registerLocaleData(localePl)

@NgModule({
  declarations: [
    AppComponent,
    InvoiceEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'zł' },
    {
      provide: LOCALE_ID,
      useValue: 'pl-PL'
    },],
  bootstrap: [AppComponent]
})
export class AppModule {}
