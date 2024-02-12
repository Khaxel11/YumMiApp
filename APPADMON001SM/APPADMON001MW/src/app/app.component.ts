import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  sidebarOpen;
  menuOpen: boolean = false;
  subMenuOpen: boolean = false;
  selectedMenu : string;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit() {
    
  }
  constructor(){

  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }
  toggleSubMenu(menu : string) {
    this.subMenuOpen = !this.subMenuOpen;
    this.selectedMenu = menu;
  }
}
