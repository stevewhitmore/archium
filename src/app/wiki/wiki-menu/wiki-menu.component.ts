import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-wiki-menu',
  templateUrl: './wiki-menu.component.html',
  styleUrls: ['./wiki-menu.component.scss']
})
export class MenuComponent implements OnInit {
  active: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  pageMenuClicked($event) {
    $event.preventDefault();
    $event.stopPropagation(); 
    console.log("CLICKED INSIDE, MENU WON'T HIDE");
    this.toggleActive();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event){
    console.log("CLICKED OUTSIDE, MENU WILL HIDE");
  }

  toggleActive() {
    this.active = !this.active;
  }

}
