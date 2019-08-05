import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastaModule } from 'ngx-toasta';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WikiComponent } from './wiki/wiki.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './toolbar/login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './wiki/wiki-menu/wiki-menu.component';
import { PlanComponent } from './plan/plan.component';
import { WikiViewComponent } from './wiki/wiki-view/wiki-view.component';

@NgModule({
  declarations: [
    AppComponent,
    WikiComponent,
    HomeComponent,
    LoginComponent,
    ToolbarComponent,
    MenuComponent,
    PlanComponent,
    WikiViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
