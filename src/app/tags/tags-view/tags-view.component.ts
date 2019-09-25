import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['../tags.component.scss']
})
export class TagsViewComponent {
  @Input() pageTags: any[];
}
