import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { WikiComponent } from './wiki.component';
import { WikiMenuComponent } from './wiki-menu/wiki-menu.component';
import { WikiViewComponent } from './wiki-view/wiki-view.component';
import { WikiAddComponent } from './wiki-add/wiki-add.component';
import { WikiDeleteComponent } from './wiki-delete/wiki-delete.component';
import { WikiEditComponent } from './wiki-edit/wiki-edit.component';

import { WikiService } from './wiki.service';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TagsModule } from '../tags/tags.module';
import { LoginComponent } from '../login/login.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        TagsModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        WikiComponent,
        WikiMenuComponent,
        WikiViewComponent,
        WikiAddComponent,
        WikiEditComponent,
        WikiDeleteComponent,
        LoginComponent
    ],
    entryComponents: [
        WikiComponent
    ],
    providers: [
        WikiService
    ]
})
export class WikiModule {}