import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-wiki-add',
  templateUrl: './wiki-add.component.html',
  styleUrls: ['./wiki-add.component.scss']
})
export class WikiAddComponent {
  @Output() toggleCreateModalEvent = new EventEmitter();
  @Output() pageCreatedEvent = new EventEmitter();
  inputPath = new FormControl('', [Validators.required]);

  constructor() {
  }

  createWikiPage() {
    this.inputPath.reset();
    this.pageCreatedEvent.emit(this.inputPath.value);
  }

  toggleCreateModal() {
    this.toggleCreateModalEvent.emit(null);
  }
}
