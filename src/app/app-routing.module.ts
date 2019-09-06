import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './wiki/wiki.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'wiki/:page', component: WikiComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
