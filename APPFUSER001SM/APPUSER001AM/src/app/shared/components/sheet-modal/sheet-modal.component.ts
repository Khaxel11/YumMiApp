import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss']
})
export class SheetModalComponent implements OnInit {
  @Input() itemTemplate: any;
  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
