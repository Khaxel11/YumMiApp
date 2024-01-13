import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { FoodHubService } from '../../../services/App/food-hub.service'
import { General } from 'src/app/functions/general';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { IonModal } from '@ionic/angular';
import { MdlDetailFoodhubComponent } from './components/mdl-detail-foodhub/mdl-detail-foodhub.component'
import { newArray } from '@angular/compiler/src/util';
import { FoodHub } from 'src/app/models/FoodHub';
@Component({
  selector: 'app-foodhubs',
  templateUrl: './foodhubs.component.html',
  styleUrls: ['./foodhubs.component.css']
})
export class FoodhubsComponent implements OnInit {
 

  lstFoodHub = new Array<FoodHub>();
  lstAllFoodHubs = new Array<FoodHub>();
  imagen : any;
  General = new General();
  filtro : string = "";
  public results = [...this.lstFoodHub];
  loading : any;
  constructor(
    private navCtrl: NavController,
    private service : FoodHubService,
    private sanitizer: DomSanitizer,
    private Load : LoadingController,
    private modalController: ModalController
  ) { }
  
  async ngOnInit(): Promise<any> {
    await this.buildMessage("Cargando...");
    await this.loading.present();
    try {
      this.getFoodHub();
    } catch (error) {
      this.General.showMessage("Revise su conexión a internet e intentelo de nuevo. "+ error, "danger");
    }
    finally{
      await this.loading.dismiss();
    }
  }

  async getFoodHub(){
    await this.loading.present();
    try {
      const idCuenta = localStorage.getItem("idCuenta")
      let data = await this.service.getFoodHubs(26,'',Number(idCuenta) );
      if(!data){
        this.General.showMessage("Revise su conexión a internet e intentelo de nuevo", "danger");
        return;
      }
      if(!data.data){
        this.General.showMessage("Revise su conexión a internet e intentelo de nuevo", "danger");
        return;
      }
      console.log(data);
      this.lstAllFoodHubs = data.data;
      this.lstFoodHub = data.data;
      
      
    } catch (error) {
      this.General.showMessage("Revise su conexión a internet e intentelo de nuevo. "+ error.message, "danger");
    }
    finally{
      await this.loading.dismiss();
    }
    
    
  }
  seleccionarCarta(carta: any) {
    
     console.log('Carta seleccionada:', carta);// carta.contenido.substring(0,1));
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return imageUrl;
  }
  
  descomponerCalificacion(calificacion: number): number[] {
    const unidades = Math.floor(calificacion); 
    const unidades05 = Math.round((calificacion - unidades) );
    const resultado = new Array(unidades).fill(1);
    resultado.push(...Array(unidades05).fill(0.5));
    const longitudActual = resultado.length;

    if (longitudActual < 5) {
      const cerosFaltantes = 5 - longitudActual;
      resultado.push(...Array(cerosFaltantes).fill(0));
    }
    return resultado;
  }
  async openMdlFoodHubDetail(e : any){
    
    const modal = await this.modalController.create({
      component: MdlDetailFoodhubComponent,
      componentProps: {
        foodHub : e
      },
    });
     modal.onWillDismiss().then( async(data)=> {
      
      if(data.data === true){
        this.getFoodHub();
      }
    })

    await modal.present();
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
  async buildMessage(Message : string){
    this.loading = await this.Load.create({
      message: Message, 
    });
  }
}
