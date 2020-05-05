import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { WikiService } from '@services';

@Component({
    selector: 'app-wiki',
    templateUrl: './wiki.component.html'
})
export class WikiComponent implements OnInit {
  addFormOn: boolean = false;
  pages$: any;
  selectedPage: any;

  constructor(private route: ActivatedRoute,
              private wikiService: WikiService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.loadPages();
  }

  loadPages() {
    this.pages$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedPage = params.get('path');
        return this.wikiService.getAllPages();
      })
    );
  }

  onAddFormActivateEvent() {
    this.addFormOn = true;
  }

  onAddPageEvent(addedPage) {
    if (addedPage) {
        this.wikiService.addPage(addedPage)
        .pipe(take(1))
        .subscribe(() => {
          this.toastrService.success('New page added!');
          this.wikiService.refreshPages();
        }, () => {
          this.toastrService.error('Error adding page!')
        });
    }

    this.addFormOn = false;
  }
}