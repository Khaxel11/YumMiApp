import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('backgroundImage', { read: ElementRef }) backgroundImage: ElementRef;
  @ViewChild('faded', { read: ElementRef }) faded: ElementRef;
  @ViewChild('tittle', { read: ElementRef }) tittle: ElementRef;
  startTop: number;
  startHeight: number;
  startImageSize: number;
   borderRadiusSet = false; // Variable para rastrear si ya se ha establecido el radio de borde
   allowScroll = false; // Variable para controlar si el desplazamiento está permitido

  @Input() productImage: string;
  productName : string = "Nombre del Producto";

  constructor(private modalController: ModalController, private navCtrl: NavController) { }

  ngOnInit(): void {
  }
  
   onTouchStart(event: TouchEvent) {
    this.startTop = this.container.nativeElement.offsetTop;
    this.startHeight = this.container.nativeElement.offsetHeight;
    this.startImageSize = this.backgroundImage.nativeElement.offsetHeight;
  }
   reachedTop = false;
  onTouchMove(event: TouchEvent) {
    if (this.startTop !== undefined && this.startHeight !== undefined && this.startImageSize !== undefined) {
      const deltaY = event.touches[0].clientY - this.startTop;
      const newTop = this.startTop + deltaY;
  
      const upperLimit = 40;
      const lowerLimit = window.innerHeight / 2;
      const maxOpacity = 0.8; 
      const opacity = maxOpacity - (lowerLimit - Math.abs(newTop)) / lowerLimit;
      
      const maxFont = 25;
      
      const gradientOpacity = 1 - Math.abs(newTop) / lowerLimit;

      if (newTop >= upperLimit && newTop <= lowerLimit) {
        this.container.nativeElement.style.top = newTop + 'px';
        this.container.nativeElement.style.height = (this.startHeight - deltaY) + 'px';
        this.faded.nativeElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, 0))`;
        
       
      }
      if (newTop >= upperLimit && newTop <= (upperLimit + 10) && !this.reachedTop) {
        this.container.nativeElement.style.borderRadius = '0 0 0 0';
        // this.tittle.nativeElement.classList.add('fadeOut');
        

        this.reachedTop = true;
      } else if (newTop > (upperLimit + 10)) {
        this.reachedTop = false;
        this.container.nativeElement.style.borderRadius = '20px 20px 0 0';
        // this.tittle.nativeElement.classList.remove('fadeOut');
        
        
      }
      
      if(!this.reachedTop){
         
         this.tittle.nativeElement.classList.add('active');
      }
      if (this.reachedTop) {
        this.allowScroll = true;
      } else {
        this.allowScroll = false;
      }

      this.startTop = newTop;
    }
  }
  onTouchEnd() {
    this.startTop = undefined;
    this.startHeight = undefined;
    this.startImageSize = undefined;
  }
 
  goBack() {
    this.navCtrl.back();
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
