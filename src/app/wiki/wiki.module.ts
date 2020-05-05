import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { WikiRoutingModule } from './wiki-routing.module';
import { MarkdownModule } from 'ngx-markdown';

import { WikiService } from '../services/wiki.service';

import { WikiComponent } from './wiki.component';
import { WikiMenuComponent } from './wiki-menu/wiki-menu.component';
import { WikiDetailComponent } from './wiki-detail/wiki-detail.component';
import { WikiAddComponent } from './wiki-add/wiki-add.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WikiRoutingModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        WikiComponent,
        WikiMenuComponent,
        WikiDetailComponent,
        WikiAddComponent
    ],
    providers: [
        WikiService
    ]
})
export class WikiModule {}