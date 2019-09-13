import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsComponent } from '../tags/tags.component';
import { TagsService } from './tags.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        TagsComponent
    ],
    declarations: [
        TagsComponent
    ],
    entryComponents: [
        TagsComponent
    ],
    providers: [
        TagsService
    ]
})
export class TagsModule {}