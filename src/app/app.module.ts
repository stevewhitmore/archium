import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastaModule } from 'ngx-toasta';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WikiComponent } from './wiki/wiki.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './wiki/wiki-menu/wiki-menu.component';
import { PlanComponent } from './plan/plan.component';
import { WikiViewComponent } from './wiki/wiki-view/wiki-view.component';
import { WikiAddComponent } from './wiki/wiki-add/wiki-add.component';
import { MarkdownModule } from 'ngx-markdown';
import { WikiEditComponent } from './wiki/wiki-edit/wiki-edit.component';
import { WikiDeleteComponent } from './wiki/wiki-delete/wiki-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    WikiComponent,
    HomeComponent,
    LoginComponent,
    ToolbarComponent,
    MenuComponent,
    PlanComponent,
    WikiViewComponent,
    WikiAddComponent,
    WikiEditComponent,
    WikiDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastaModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
