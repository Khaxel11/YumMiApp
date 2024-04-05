import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { SharedDataService } from 'src/app/services/common/SharedService';

@Component({
  selector: 'draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})
export class DraggableComponent implements OnInit {
  
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('backgroundImage', { read: ElementRef }) backgroundImage: ElementRef;
  @ViewChild('faded', { read: ElementRef }) faded: ElementRef;
  // @ViewChild('tittle', { read: ElementRef }) tittle: ElementRef;
  @Input() itemTemplate: any;
  @Input() headerTemplate : any;
  private startTop: number;
  private startHeight: number;
  private startImageSize: number;
  

  private borderRadiusSet = false; // Variable para rastrear si ya se ha establecido el radio de borde
  allowScroll = false; // Variable para controlar si el desplazamiento está permitido
  @Input() Image: string;
  @Input() Title : string;
  constructor(private modalController: ModalController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalController.dismiss();
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
   //#region EVENTOS PARA DESPLAZAMIENTO DE DETALLE
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

      if (!this.reachedTop) {

        // this.tittle.nativeElement.classList.add('active');
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
    this.navCtrl.navigateBack("/products/catalog");
  }
}
