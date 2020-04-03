import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TagsComponent } from '../tags/tags.component';
import { TagsService } from './tags.service';
import { TagsUpdateComponent } from './tags-update/tags-update.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
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
        TagsService,
        {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
    ]
})
export class TagsModule {}