import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cards-catalog',
  templateUrl: './cards-catalog.component.html',
  styleUrls: ['./cards-catalog.component.css']
})
export class CardsCatalogComponent implements OnInit {

  constructor(private NavCtr : NavController) { }

  ngOnInit(): void {
  }
  cards = [
    { number: '1234 5678 9101 1121', holder: 'John Doe', expiry: '12/24' },
    { number: '5432 1098 7654 3210', holder: 'Jane Doe', expiry: '06/23' }
  ];

  addNewCard() {
    this.NavCtr.navigateForward("/profile/cards/capture");
  }
}
