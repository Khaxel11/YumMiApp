import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { SharedDataService } from 'src/app/services/common/SharedService';
import { ProgramationProductsComponent } from '../../../shared/utils/programation-products/programation-products.component'
import { ProgramationBuilder, FechasProgramadasBuilder} from '../../../models/ProgramationBuilder'
import { Programation, FechasProgramadas } from '../../../models/Programation'
import { element } from 'protractor';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  @ViewChild('fechas') public fechas : ProgramationProductsComponent;
  programacionBuild = new ProgramationBuilder();
  fechasBuild = new FechasProgramadasBuilder();
  fechasFinal = new Array<FechasProgramadas>();
  Programation = new Programation();
  month : number; 
  year : number;
  Producto: Product = new Product();
  selectedDates: boolean = false;
  isComplete : boolean = false;
  fechasProgramadas = {
    FechasProgramadas : [],
    Descripcion : "",
    idFoodHub : 0
  };

  loading : any;
  constructor(
    private sharedService : SharedDataService,
    private navCtrl: NavController,
    private Load : LoadingController,
  ) {
    const date = new Date();
    this.month = date.getMonth();
    this.year = date.getFullYear();
   }

  ngOnInit(): void {
    this.sharedService.producto.subscribe(producto => {
      this.Producto = producto
      if(!this.Producto){
        this.navCtrl.navigateBack("/products/catalog")
      }
    });
    this.buildMessage("Cargando...");

    console.log(this.Producto);
  }
  async buildMessage(Message : string){
    this.loading = await this.Load.create({
      message: Message, 
    });
  }
  async continue(event){
    //Empezaremos a construir el objeto de las fechas Seleccionadas
    await this.loading.present();
    this.fechasProgramadas = event;
    
    try {
      this.sharedService.setFechas(this.fechasProgramadas);
      this.selectedDates = true;  
    } catch (error) {
      
    }
    finally{
      await this.loading.dismiss();
    }
  }
  async continueEnd(e : any){
    if(!e){
      this.sharedService.producto.subscribe(producto => {
          this.Producto = producto
          if(!this.Producto){
            this.navCtrl.navigateBack("/products/catalog")
          }
        });
        
      this.selectedDates = false;
    }
    try {
      this.fechasProgramadas.idFoodHub = Number(e);
    } catch (error) {
      
    }
    
    this.buildProgramation();
  }

  async buildProgramation(){
    //tipos de programacion
    //R Regular
    //E Especial
    //T Temporada
    //D Descuento
    await this.loading.present();
    try {
      this.fechasProgramadas.FechasProgramadas.forEach(element => {
          this.fechasBuild = new FechasProgramadasBuilder()
          .withFecha(element.dateObj)
          .withIdFechaProgramada(0)
          .withIdProgramacion(0)
          .withCantidad(0)
          .withTipoProgramacion('R')
          this.fechasFinal.push(this.fechasBuild.build());
      });
      this.programacionBuild = new ProgramationBuilder()
        .withDescripcion(this.fechasProgramadas.Descripcion)
        .withIdFoodHub(this.fechasProgramadas.idFoodHub)
        .withIdProducto(this.Producto.idProducto)
        .withNotificacionesActivadas(true)
        .withFechasProgramadas(this.fechasFinal);
  
        this.Programation = this.programacionBuild.build();
        
  
        console.log(this.Programation);
        this.isComplete = true;
    } catch (error) {
      
    }
    finally{
      await this.loading.dismiss();
    }
  }
  
}
