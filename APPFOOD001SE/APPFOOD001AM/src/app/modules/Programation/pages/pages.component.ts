import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  month : number;
  year : number;
  constructor() {
    const date = new Date();
    this.month = date.getMonth();
    this.year = date.getFullYear();
   }

  ngOnInit(): void {
  }

}
