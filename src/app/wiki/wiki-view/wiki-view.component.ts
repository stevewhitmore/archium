import { Component, Input } from '@angular/core';
import { WikiModel } from 'src/app/_shared/models';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.scss']
})
export class WikiViewComponent {
  @Input() pageContent: WikiModel;
}
