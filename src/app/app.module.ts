import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WikiComponent } from './wiki/wiki.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ToastaModule } from 'ngx-toasta';

@NgModule({
  declarations: [
    AppComponent,
    WikiComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
