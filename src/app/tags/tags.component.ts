import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnChanges {
  @Input() path: string;
  pageTags: any[];

  constructor(private tagsService: TagsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.path.currentValue !== changes.path.previousValue) {
      this.path = changes.path.currentValue;
    }
    this.getTagData(this.path);
  }

  getTagData(path) {
    this.tagsService.getTagData(path)
    .pipe(take(1))
    .subscribe(data => {
      this.pageTags = data ? data : [];
    });
  }
}
