import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, Gesture, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-mdl-completed-programation',
  templateUrl: './mdl-completed-programation.component.html',
  styleUrls: ['./mdl-completed-programation.component.css']
})
export class MdlCompletedProgramationComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }
  closeModal(e? : any) {
   
    this.modalController.dismiss(e);
  }
}
