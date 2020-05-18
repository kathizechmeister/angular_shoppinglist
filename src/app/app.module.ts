import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShoppinglistListComponent } from './shoppinglist-list/shoppinglist-list.component';
import { ShoppinglistListItemComponent } from './shoppinglist-list-item/shoppinglist-list-item.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import {ShoppinglistStoreService} from "./shared/shoppinglist-store.service";
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import { registerLocaleData } from '@angular/common' ;
import localeDe from '@angular/common/locales/de' ;
import { LOCALE_ID } from '@angular/core' ;
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistListComponent,
    ShoppinglistListItemComponent,
    ShoppinglistDetailsComponent,
    HomeComponent,
    ShoppinglistFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,
      ReactiveFormsModule
  ],
  providers: [ShoppinglistStoreService, AuthenticationService,
      { provide:LOCALE_ID, useValue:'de'}, {
          provide : HTTP_INTERCEPTORS ,
          useClass : TokenInterceptorService,
          multi : true
      },
      {
          provide : HTTP_INTERCEPTORS ,
          useClass : JwtInterceptorService,
          multi : true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
