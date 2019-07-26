import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class MenuComponent implements OnInit {
  pageMenuActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  pageMenuClicked($event) {
    $event.preventDefault();
    $event.stopPropagation(); 
    console.log("CLICKED INSIDE, MENU WON'T HIDE");
    this.togglePageMenuActive();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event){
    this.togglePageMenuActive();
  }

  togglePageMenuActive() {
    this.pageMenuActive = !this.pageMenuActive;
  }

}
