import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WikiMenuComponent } from './wiki-menu/wiki-menu.component';
import { WikiDetailComponent } from './wiki-detail/wiki-detail.component';
import { WikiComponent } from './wiki.component';

const wikiRoutes: Routes = [
  {
    path: '',
    component: WikiComponent,
    children: [
      {
        path: '',
        component: WikiMenuComponent,
        children: [
          {
            path: ':path',
            component: WikiDetailComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(wikiRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WikiRoutingModule { }
