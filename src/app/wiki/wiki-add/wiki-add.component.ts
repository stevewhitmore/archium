import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { WikiService } from '../wiki.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-wiki-add',
  templateUrl: './wiki-add.component.html',
  styleUrls: ['./wiki-add.component.scss']
})
export class WikiAddComponent implements OnInit {
  @Output() toggleCreateModalEvent: EventEmitter = new EventEmitter();
  inputPath = new FormControl('', [Validators.required]);

  constructor(private wikiService: WikiService) { }

  ngOnInit() {
  }

  createWikiPage() {
    console.log(this.inputPath.value);
    // this.wikiService.createPage(this.inputPath.value)
    //   .pipe(take(1))
    //   .subscribe(resp => {
    //     // this.successfulUpdate(resp, this.inputPath.value);
    //   }, resp => {
    //     // this.unsuccessfulUpdate(resp);
    //   });
  }


  toggleCreateModal() {

  }
}
