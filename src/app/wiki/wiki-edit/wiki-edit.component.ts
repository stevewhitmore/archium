import { Component, OnInit, Input, SimpleChange, OnChanges, EventEmitter, Output } from '@angular/core';
import { WikiModel } from 'src/app/_shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wiki-edit',
  templateUrl: './wiki-edit.component.html',
  styleUrls: ['./wiki-edit.component.scss']
})
export class WikiEditComponent implements OnChanges, OnInit {
  @Input() pageContent: WikiModel;
  @Output() editEvent = new EventEmitter();
  currentContent: WikiModel;
  wikiEditForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['pageContent'] && changes['pageContent'].currentValue) {
      this.currentContent = changes['pageContent'].currentValue;
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.wikiEditForm = this.fb.group({
      title: [this.currentContent.title, Validators.required],
      path: [this.currentContent.path, Validators.required],
      content: this.currentContent.content
    });
  }

  saveEdit() {
    const updatedPage = Object.assign({}, this.currentContent, this.wikiEditForm.value)

    this.editEvent.emit(updatedPage);
  }

  cancelEdit() {
    this.editEvent.emit(null);
  }

  pathMatchTitle() {
    const title = this.wikiEditForm.controls.title.value;
    const formattedTitle = title.replace(/[^a-z0-9+]+/gi, '-').toLowerCase();
    this.wikiEditForm.controls.path.setValue(formattedTitle);
  }
}
