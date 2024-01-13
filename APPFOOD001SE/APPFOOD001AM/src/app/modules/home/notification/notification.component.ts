import { Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements AfterViewInit {
  @Output() ItemData = new EventEmitter<any>();
  lstNotification = [];
  constructor(private modalController: ModalController
    , private service : KitchenService
    ) { }
  idCuenta : string;
  
  async ngAfterViewInit(): Promise<void> {
    await this.getNotificaciones();
  }
  async getNotificaciones(){
    let data = await this.service.getNotification(Number(this.idCuenta));
    console.log(data.data);
    this.lstNotification = data.data;
  }
  closeModal(e? : any) {
    //console.log(this.idCuenta);
    this.modalController.dismiss(this.lstNotification.length);
  }
  deleteNotification(notification: any) {
    const index = this.lstNotification.indexOf(notification);
    if (index > -1) {
      this.lstNotification.splice(index, 1);
    }
  }
  
}
