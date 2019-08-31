import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './wiki/wiki.component';
import { PlanComponent } from './plan/plan.component';
import { AuthGuard } from './_shared/security/auth-guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'plan', component: PlanComponent, canActivate: [AuthGuard]  },
  { path: 'wiki', component: WikiComponent, canActivate: [AuthGuard]  },
  { path: 'wiki', component: WikiComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
