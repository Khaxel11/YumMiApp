import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'slider-cs',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent  {
  @Input() title: string = 'Template Viewer';
  @Input() backUrl: string = '/';

  // El template seleccionado se insertará aquí
  @Input() selectedTemplate: any;
}
