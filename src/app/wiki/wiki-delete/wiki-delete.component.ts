import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wiki-delete',
  templateUrl: './wiki-delete.component.html',
  styleUrls: ['./wiki-delete.component.scss']
})
export class WikiDeleteComponent implements OnInit {
  @Output() toggleDeleteModalEvent = new EventEmitter();
  @Output() pageDeleteEvent = new EventEmitter();
  doomedPath: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.doomedPath = this.route.snapshot.params['page'];
  }

  confirmDeletion() {
    this.pageDeleteEvent.emit(this.doomedPath);
  }

  toggleDeleteOff() {
    this.toggleDeleteModalEvent.emit(null);
  }

}