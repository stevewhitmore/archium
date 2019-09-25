import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { TagsComponent } from '../tags/tags.component';
import { TagsService } from './tags.service';
import { TagsUpdateComponent } from './tags-update/tags-update.component';
import { TagsViewComponent } from './tags-view/tags-view.component';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        TagsComponent
    ],
    declarations: [
        TagsComponent,
        TagsUpdateComponent,
        TagsViewComponent
    ],
    entryComponents: [
        TagsComponent
    ],
    providers: [
        TagsService
    ]
})
export class TagsModule {}