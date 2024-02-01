import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, UrlSerializer } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';

import { IonicModule } from '@ionic/angular';
//animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, CalendarComponent } from 'ion2-calendar';



@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    // NgbModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    CalendarModule,
    
  ],
  providers: [Geolocation, GoogleMaps],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
