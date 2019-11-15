import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WikiComponent } from './wiki/wiki.component';


const routes: Routes = [
  { path: 'wiki', component: WikiComponent },
  { path: 'wiki/:page', component: WikiComponent },
  { path: '**', redirectTo: 'wiki' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
