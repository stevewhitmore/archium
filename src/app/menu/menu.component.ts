import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuService } from '../_services/menu.service';
import { AuthenticationService } from '../_services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  toggleMenuSub: Subscription;
  menuVisible = false;
  filterInput = new FormControl('');
  menuItems = [];
  filteredMenuItems = [];

  constructor(private menuService: MenuService,
              private authenticationService: AuthenticationService){                
  }

  ngOnInit() {
    this.toggleMenuSub = this.menuService.toggleMenuComponentReceived$
                          .subscribe(() => this.toggleMenu());
  }

  getPagePaths() {
    if (this.menuItems.length === 0) {
      this.menuService.getPagePaths().subscribe(pageMap => {
        this.menuItems = pageMap;
      });
    }
  }

  toggleMenu() {
    const menu = document.querySelector('#menu');
    menu.classList.toggle('active');
    if (menu.classList.contains('active') && this.authenticationService.isLoggedIn()) {
      this.getPagePaths();
    } else {
      this.menuItems.length = 0;
    }
  }

  filterMenuItems(input) {
    if (!input) {
      this.filteredMenuItems = [];
      return;
    }
    this.filteredMenuItems = this.menuItems.filter(item => item.toLowerCase().indexOf(input.toLowerCase()) > -1);
  }

  ngOnDestroy() {
    if (this.toggleMenuSub) this.toggleMenuSub.unsubscribe();
  }

}
