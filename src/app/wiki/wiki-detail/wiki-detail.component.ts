import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiService } from '../../services/wiki.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-wiki-detail',
  templateUrl: './wiki-detail.component.html',
  styleUrls: ['./wiki-detail.component.scss']
})
export class WikiDetailComponent implements OnChanges, OnInit {
  @Input() selectedPage: any;
  currentPage: any;
  routeSub;

  constructor(private route: ActivatedRoute,
              private wikiService: WikiService) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    
  }

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

}
