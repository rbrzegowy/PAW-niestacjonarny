import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { TestComponent } from './testy/test/test.component'
import { TestSerwisComponent } from './testy/test-serwis/test-serwis.component'

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestSerwisComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
