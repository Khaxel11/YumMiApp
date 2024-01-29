import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent implements AfterViewInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @Input () items : any[];
  
  constructor(private sanitizer: DomSanitizer,
    private navCtrll : NavController) { }
  currentSlideIndex: number = 0;

  ngAfterViewInit(): void {
    console.log(this.items);
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
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  onClickItemSlider(e : any){
    if(e.RutaRedirecciona){
      this.navCtrll.navigateForward(e.RutaRedirecciona);
    }

  }
}
