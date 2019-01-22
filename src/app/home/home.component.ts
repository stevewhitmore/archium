import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';

@Component({
  selector: 'app-home',
  template: `
  <div class="container">
    <h2>Archium [ar'kiyum]</h2>
    <h3>"the archives"</h3>
    <p>A simple application for recording the things that matter.</p>
  </div>`,
  styles: [
    `.container {
      display: flex;
      flex-flow: column;
      padding: 0 15px;
    }
    h3 {margin:0}`]
})
export class HomeComponent implements OnInit {  

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.updatePagePath(null);
  }

}
