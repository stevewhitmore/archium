import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { formatPagePath } from '@helpers';

@Component({
    selector: 'app-wiki-add',
    templateUrl: './wiki-add.component.html'
})
export class WikiAddComponent implements OnInit {
    @Output() addPageEvent: EventEmitter<any> = new EventEmitter();
    pageTitle: FormControl;
    addedPage: any;

    ngOnInit() {
        this.pageTitle = new FormControl('');
    }

    addPage() {
        this.assembleAddedPage();
        this.addPageEvent.emit(this.addedPage);
    }

    assembleAddedPage() {
        this.addedPage = {
            title: this.pageTitle.value,
            path: formatPagePath(this.pageTitle.value),
            content: ''
        }
    }

    cancelAdd() {
        this.addPageEvent.emit(null);
    }
}