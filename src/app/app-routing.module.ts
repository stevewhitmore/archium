import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { WikiComponent } from './wiki/wiki.component';


const routes: Routes = [
  {
    path: 'wiki',
    loadChildren: () => import('./wiki/wiki.module').then(m => m.WikiModule),
    data: { preload: true }
  },
  { path: '', redirectTo: '/wiki', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
