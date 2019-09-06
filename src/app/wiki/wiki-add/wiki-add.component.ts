import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-wiki-add',
  templateUrl: './wiki-add.component.html',
  styleUrls: ['./wiki-add.component.scss']
})
export class WikiAddComponent {
  @Output() toggleCreateModalEvent = new EventEmitter();
  @Output() createPageEvent = new EventEmitter();
  pageTitle = new FormControl('', [Validators.required]);

  createWikiPage() {
    this.createPageEvent.emit(this.pageTitle.value);
  }

  toggleCreateModal() {
    this.createPageEvent.emit(null);
  }
}
