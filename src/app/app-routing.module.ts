import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './wiki/wiki.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './security/auth-guard';
import { PlanComponent } from './plan/plan.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'page/:page', component: WikiComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
