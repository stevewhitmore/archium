import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastaModule } from 'ngx-toasta';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './toolbar/login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WikiModule } from './wiki/wiki.module';
import { TagsModule } from './tags/tags.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    WikiModule,
    TagsModule,
    ToastaModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
