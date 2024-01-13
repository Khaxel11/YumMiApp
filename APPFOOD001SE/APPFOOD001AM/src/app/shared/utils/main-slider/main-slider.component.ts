import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  
  constructor() { }
  currentSlideIndex: number = 0;

  ngOnInit(): void {
  }
 

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 5000, // Tiempo de espera entre cada slide en milisegundos (por ejemplo, 2000 ms = 2 segundos)
    },
  
  };
  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.currentSlideIndex = index;
    });
  }
 
}
