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
  inputPath = new FormControl('', [Validators.required]);

  createWikiPage() {
    this.createPageEvent.emit(this.inputPath.value);
  }

  toggleCreateModal() {
    this.createPageEvent.emit(null);
  }
}
