import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiService } from '../../services/wiki.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.scss']
})
export class WikiViewComponent implements OnChanges, OnInit {
  @Input() selectedPage: any;
  currentPage: any;
  routeSub;

  constructor(private route: ActivatedRoute,
              private router: Router,
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
