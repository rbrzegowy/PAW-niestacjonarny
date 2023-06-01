import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from './app-components/header/header.component'
import { MaterialModule } from './material/material.module'
import { AppComponent } from './app-components/app/app.component'
import { HelpersModule } from './helpers/helpers.module'
import { TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './helpers/custom-title-strategy'
import { DashboardComponent } from './app-components/dashboard/dashboard.component'
import { NotFoundComponent } from './app-components/not-found/not-found.component'
import { PiaskownicaModule } from './piaskownica/piaskownica.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HelpersModule,
    PiaskownicaModule,
    HttpClientModule
  ],
  providers: [
    // strategia budowy tytułów podstron
    // {
    //   provide: TitleStrategy,
    //   useClass: CustomTitleStrategy
    // },
    // interceptory
    // { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    // zmiana url-a bazowego aplikacji
    // { provide: APP_BASE_HREF, useValue: '/mikro2' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
