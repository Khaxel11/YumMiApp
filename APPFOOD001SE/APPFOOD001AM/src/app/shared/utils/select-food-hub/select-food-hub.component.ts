import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AlertController, NavController } from '@ionic/angular';
import { FoodHub } from 'src/app/models/FoodHub';
import { FoodHubService } from 'src/app/services/App/food-hub.service';

@Component({
  selector: 'app-select-food-hub',
  templateUrl: './select-food-hub.component.html',
  styleUrls: ['./select-food-hub.component.css']
})
export class SelectFoodHubComponent implements OnInit {
  @Output() onContinue = new EventEmitter();
  lstFoodHub = new Array<FoodHub>();
  lstAllFoodHubs = new Array<FoodHub>();
  selectedIdFoodHub : Number = 0;
  filtro:string;
  
  public results = [...this.lstFoodHub];
  constructor(private service : FoodHubService, private alertController: AlertController, private navCtrll : NavController) { }

  ngOnInit(): void {
    this.getFoodHubs();
    
  }
  async getFoodHubs(){
    
      let data = await this.service.getMyFoodHubs();
      data.data = [...data.data]
      this.lstFoodHub = data.data;
      this.lstAllFoodHubs = data.data;
      this.selectedIdFoodHub = this.lstFoodHub[0].idFoodHub;
      console.log(data);
  }

  async onContinueFinish(){
    const foodHub = this.lstAllFoodHubs.find(items => items.idFoodHub === this.selectedIdFoodHub);
    const alert = await this.alertController.create({
      header: 'Confirmar selección',
      message: 'Haz seleccionado el FoodHub <strong>' + foodHub.nombreHub + '</strong>.<br>Si desea añadir otra programación del mismo producto en otro lugar tendra que realizarla manualmente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si, Confirmar',
          handler: async () => {
            this.onContinue.emit(this.selectedIdFoodHub.toString());
          }
        }
      ]
    });
    await alert.present();
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return imageUrl;
  }
  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.lstAllFoodHubs.filter((d) => d.nombreHub.toLowerCase().indexOf(query) > -1);

    this.lstFoodHub = this.results;
  }
  selectFilteredHub(e : any){
    this.results = this.lstAllFoodHubs.filter((d) => d.nombreHub.toLowerCase().indexOf(e.nombreHub.toLowerCase()) > -1);
    this.lstFoodHub = this.results;
  }
  async goBack(){
    this.onContinue.emit(false);
    
  }

}
