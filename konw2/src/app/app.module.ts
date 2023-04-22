import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { CardComponent } from './card/card.component'
import { UserComponent } from './user/user.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    UserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
