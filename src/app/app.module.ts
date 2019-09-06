import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastaModule } from 'ngx-toasta';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './toolbar/login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WikiModule } from './wiki/wiki.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    WikiModule,
    ToastaModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ToolbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
