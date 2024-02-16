import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodHub } from 'src/app/models/FoodHub';
import { FoodHubService } from '../../../../../services/App/food-hub.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';


@Component({
  selector: 'app-mdl-detail-foodhub',
  templateUrl: './mdl-detail-foodhub.component.html',
  styleUrls: ['./mdl-detail-foodhub.component.css']
})
export class MdlDetailFoodhubComponent implements OnInit {
  @Output() ItemData = new EventEmitter<any>();
  foodHub : FoodHub = new FoodHub();
  nombre : string = "";
  lstCalificaciones = [];
  currentIndex: number = 0;
  displayedCalificaciones: any[] = []; 
  chunkSize: number = 2; 
  loadingData: boolean = false;
  lstCalifica: number[] = [0];
  General = new General();
  MESSAGE = new MESSAGE();
  constructor(private modalController: ModalController
    ,private service : FoodHubService
    ,private alertController: AlertController
    ) {
      
    }
  
  async ngOnInit() {
    await console.log(this.foodHub);
    await this.getCalificaciones();
    await this.loadData();
  }
  async asignFoodHub(){
    var opcion : number = 1;
    const idCuenta : string = localStorage.getItem('idCuenta');
    if(this.foodHub.asignado){
      opcion = 2;
    }
    const Mensaje = opcion === 1 ? '¿Estás seguro de asignar?. Aparecera en tu lista de establecimientos disponibles' : '¿Estás seguro de quitar de tu lista de asignados?'
    const alert = await this.alertController.create({
      header: 'Asignar',
      message: Mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Acción cancelada');
          }
        }, {
          text: opcion === 1 ? 'Si, asignar': 'Si, quitar',
          handler: async () => {
            // console.log('Acción confirmada');
            await this.asignHub(opcion, idCuenta);
          }
        }
      ]
    });

    await alert.present();
    
    
  }
  async asignHub(opcion : number, idCuenta : string){
    let data = await this.service.asignFoodhub(opcion, Number(idCuenta), this.foodHub.idFoodHub, false, this.foodHub.idAsignado);
    if(!data){
      this.General.showMessage(this.MESSAGE.ERROR, "danger");
      return;
    }
    if(!data.data){
      this.General.showMessage(this.MESSAGE.NET_ERROR, "danger");
      return;
    }
    this.General.showMessage(opcion === 1 ? 'FoodHub asignado' : 'Se ha quitado el FoodHub', opcion === 1 ? "success" : "warning");
    this.closeModal(true)
    this.ItemData.emit(true);
  }

  async getCalificaciones(){
    let data = await this.service.getCalificaciones(this.foodHub.idFoodHub)
    this.lstCalificaciones = data.data;
    console.log(data.data);
    this.lstCalifica = this.lstCalificaciones.map(calif => calif.calificacion);
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return imageUrl;
  }
  closeModal(e? : any) {
    //console.log(this.foodHub);
    this.modalController.dismiss(e);
  }
  loadData(event?: any) {
    if (this.loadingData) {
      return;
    }

    this.loadingData = true;

    if (this.currentIndex >= this.lstCalificaciones.length) {
      if (event) {
        event.target.complete();
        event.target.disabled = true;
      }

      this.loadingData = false;

      return;
    }

    const end = this.currentIndex + this.chunkSize;

    this.displayedCalificaciones = this.displayedCalificaciones.concat(this.lstCalificaciones.slice(this.currentIndex, end));

    this.currentIndex = end;

    if (event) {
      event.target.complete();
    }

    this.loadingData = false;
  }
  showLoadMoreButton(): boolean {
    // Muestra el botón solo cuando se han cargado elementos y no se han cargado todos los elementos
    return this.displayedCalificaciones.length > 0 && this.currentIndex < this.lstCalificaciones.length;
  }
}
