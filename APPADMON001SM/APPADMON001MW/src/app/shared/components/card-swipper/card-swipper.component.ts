import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'card-swipper',
  templateUrl: './card-swipper.component.html',
  styleUrls: ['./card-swipper.component.css']
})
export class CardSwipperComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() itemTemplate: any;
  totalPagesArray: number[];

  totalCards: number;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }
  constructor() { }

  ngOnInit() {
    this.totalCards = this.items.length;
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);

  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor) {
    if(this.currentPage === 1 && incrementor === -1) {
      return;
    }
    if(this.currentPage === this.totalPages && incrementor === +1){
      return;
    }
    const next = this.currentPage += incrementor;
    this.currentPage = next;// += incrementor;
    this.populatePagePosition();
  }

  goToPage(i){
    this.currentPage = i;
    this.populatePagePosition();
  }
  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }

}
