import { Component, OnInit, HostListener } from '@angular/core';
import { take } from 'rxjs/operators';

import { WikiService } from '../wiki.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class MenuComponent implements OnInit {
  pageMenuActive: boolean = false;
  pageMenuItems = [];
  filteredMenuItems = [];

  constructor(private wikiService: WikiService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.wikiService.getAllPageLinks()
      .pipe(take(1))
      .subscribe(resp => {
        this.pageMenuItems = resp;
      }, err => {
        this.notificationService.notify('error', err.message);
      });
  }

  pageMenuClicked($event) {
    $event.preventDefault();
    $event.stopPropagation(); 
    this.togglePageMenuOn();
  }
  @HostListener('document:click', ['$event']) clickedOutside($event){
    this.togglePageMenuOff();
  }
  togglePageMenuActive() {
    this.pageMenuActive = !this.pageMenuActive;
  }
  togglePageMenuOff() {
    this.pageMenuActive = false;
  }
  togglePageMenuOn() {
    this.pageMenuActive = true;
  }

  filterMenuItems(input) {
    if (!input) {
      this.filteredMenuItems = [];
      return;
    }
    this.filteredMenuItems = this.pageMenuItems.filter(item => item.title.toLowerCase().indexOf(input.toLowerCase()) > -1);
  }


}
