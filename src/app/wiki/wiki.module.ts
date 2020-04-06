import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { WikiComponent } from './wiki.component';

import { WikiService } from './wiki.service';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WikiViewComponent } from './wiki-view/wiki-view.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        WikiComponent,
        WikiViewComponent
    ],
    providers: [
        WikiService
    ]
})
export class WikiModule {}