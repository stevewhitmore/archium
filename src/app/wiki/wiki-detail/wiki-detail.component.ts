import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { WikiService } from '@services';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-wiki-detail',
  templateUrl: './wiki-detail.component.html',
  styleUrls: ['./wiki-detail.component.scss']
})
export class WikiDetailComponent implements OnInit, OnDestroy {
  currentPage: any;
  routeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private wikiService: WikiService,
              private toastrService: ToastrService) { }

  ngOnInit() {
     this.routeSub = this.route.params.subscribe(params => {
      if (params) {
        const path = params['path'];

        this.wikiService.getPage(path)
          .pipe(take(1))
          .subscribe(page => {
            this.currentPage = page;
          });
      }
    });
  }

  saveChanges() {
    this.wikiService.update(this.currentPage)
      .pipe(take(1))
      .subscribe(() => {
        this.toastrService.success('Changes saved!');
      }, () => {
        this.toastrService.error('Error saving changes!')
      });
  }

  ngOnDestroy() {
    if (this.routeSub) { this.routeSub.unsubscribe(); }
  }

}
