import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { WikiRoutingModule } from './wiki-routing.module';
import { MarkdownModule } from 'ngx-markdown';

import { WikiService } from '../services/wiki.service';

import { WikiComponent } from './wiki.component';
import { WikiMenuComponent } from './wiki-menu/wiki-menu.component';
import { WikiDetailComponent } from './wiki-detail/wiki-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WikiRoutingModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        WikiComponent,
        WikiMenuComponent,
        WikiDetailComponent
    ],
    providers: [
        WikiService
    ]
})
export class WikiModule {}