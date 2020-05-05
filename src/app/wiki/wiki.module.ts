import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WikiRoutingModule } from './wiki-routing.module';
import { MarkdownModule } from 'ngx-markdown';

import { WikiService } from '../services/wiki.service';

import { WikiComponent } from './wiki.component';
import { WikiMenuComponent } from './wiki-menu/wiki-menu.component';
import { WikiViewComponent } from './wiki-view/wiki-view.component';

@NgModule({
    imports: [
        CommonModule,
        WikiRoutingModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        WikiComponent,
        WikiMenuComponent,
        WikiViewComponent
    ],
    providers: [
        WikiService
    ]
})
export class WikiModule {}