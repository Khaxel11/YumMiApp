
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './shared/components/auth/auth.component';
import { RouterModule, UrlSerializer } from '@angular/router';
import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor } from './helpers/jwtInterceptor';
import { DatepickerI18n } from './shared/services/datepicker-i18n.service';
import { LowerCaseUrlSerializer } from './models/common/lowerCaseUrlSerializer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgccsArchivosModule } from 'ngccs-archivos';
import { ToastrModule } from 'ngx-toastr';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { HeaderComponent } from './shared/Menu/header/header.component'
import { MenuComponent } from './shared/Menu/menu/menu.component'
import { FooterComponent } from './shared/Menu/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    NgccsArchivosModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: 'i18n', useValue: {language: 'fr'}},
    {provide: NgbDatepickerI18n, useClass: DatepickerI18n},
    {provide: UrlSerializer, useClass: LowerCaseUrlSerializer},
    
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    NgbActiveModal,
    CurrencyPipe,

  ],
  bootstrap: [AppComponent]
})  
export class AppModule { }
