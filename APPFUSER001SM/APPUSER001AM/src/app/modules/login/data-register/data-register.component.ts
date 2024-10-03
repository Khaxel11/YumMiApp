import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-register',
  templateUrl: './data-register.component.html',
  styleUrls: ['./data-register.component.css']
})
export class DataRegisterComponent implements OnInit {
  @ViewChild('slidesContainer', { static: false }) slidesContainer: ElementRef;
  currentSlideIndex: number = 0;
  startX: number = 0;
  currentX: number = 0;
  isDragging: boolean = false;
  currentSlide: string = 'slide2';
  animationClass: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  //#region METODOS DE MOVIMIENTO DEL SLIDER


  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
    this.slidesContainer.nativeElement.style.transition = 'none';
  }


  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
    const deltaX = this.currentX - this.startX;
    const offset = -this.currentSlideIndex * window.innerWidth + deltaX;
  }


  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const deltaX = this.currentX - this.startX;
    const threshold = window.innerWidth / 4;

    if (deltaX < -threshold) {
      this.navigateToNextSlide();
    } else if (deltaX > threshold) {
      this.navigateToPreviousSlide();
    }
  }

  navigateToNextSlide() {
    if (this.currentSlideIndex < 2) {
      this.animationClass = 'animated-left';
      this.currentSlideIndex++;
      this.currentSlide = `slide${this.currentSlideIndex + 1}`;

      setTimeout(() => {
        this.animationClass = '';
      }, 500);
    }
  }

  navigateToPreviousSlide() {
    if (this.currentSlideIndex > 0) {
      this.animationClass = 'animated-right';
      this.currentSlideIndex--;
      this.currentSlide = `slide${this.currentSlideIndex + 1}`;

      setTimeout(() => {
        this.animationClass = '';
      }, 500);
    }
  }

  navigateToSlide(slideId: string) {
    if (this.isValidSlide(slideId)) {
      this.currentSlide = slideId;
      this.currentSlideIndex = parseInt(slideId.replace('slide', ''), 10) - 1;
    }
  }

  isValidSlide(slideId: string): boolean {
    const validSlides = ['slide1', 'slide2', 'slide3'];
    return validSlides.includes(slideId);
  }
  //#endregion

}
