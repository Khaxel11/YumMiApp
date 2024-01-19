import { Component, Input, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'slider-cs',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent  {
  @Output() valuePosition  = new EventEmitter<any>();
  private gesture: Gesture;
  private xPos : number;

  constructor(private gestureCtrl: GestureController) {}

  
  ngOnInit() {
    this.createGesture();
  }

  ngOnDestroy() {
    this.gesture.destroy();
  }

  createGesture() {
    this.gesture = this.gestureCtrl.create({
      el: document.querySelector('ion-content'), // Selecciona el elemento ion-content
      gestureName: 'swipe-gesture',
      onStart: ev => {
        //console.log('Inicio del gesto');
      },
      onMove: ev => {
        if (ev.deltaX > 0) {
          // Deslizamiento hacia la derecha
          this.xPos = ev.deltaX;
          //console.log('Deslizamiento hacia la derecha');
        } else if (ev.deltaX < 0) {
          // Deslizamiento hacia la izquierda
          //console.log('Deslizamiento hacia la izquierda');
        }
        this.xPos = ev.deltaX;
      },
      onEnd: ev => {

        // console.log('Fin del gesto', this.xPos);
        this.valuePosition.emit(this.xPos)
      },
    });

    this.gesture.enable();
  }
}
