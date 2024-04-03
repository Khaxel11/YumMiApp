import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { Programation,FechasProgramadas } from 'src/app/models/Programation';
import { Product } from 'src/app/models/product';
import { ProgramationService } from 'src/app/services/App/programation.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements AfterViewInit {
  @Input() Producto = new Product();
  @Input() Programation = new Programation();
  reglas = {
    QualityRule : false,
    TermsRule : false
  };
  general = new General();
  loading : any;
  constructor(private Load : LoadingController, private service : ProgramationService) { }

  ngAfterViewInit(): void {
    
  }

  continue(){
    if(!this.reglas.QualityRule){
      this.general.showMessage("Debe de aceptar estar comprometido con la calidad de su producto", 'warning'); 
      return;
    }
    if(!this.reglas.TermsRule){
      this.general.showMessage("Debe de estar de acuerdo con los terminos y condiciones", 'warning'); 
      return;
    }
    this.buildMessage("Cargando...")
    .then((value)=>{

      this.programProduct().then(()=>{
        //console.log(value);
      })
      
    }).catch((error)=>console.log(error))

  }

  async programProduct(){
    try {
      let data = await this.service.programProduct(1, this.Programation);
      if (!data.data) {this.general.showMessage("Error, no se ha podido programar el producto", 'danger'); return;};
      this.general.showMessage(
        data.data.correct ? 'Pedido Programado Correctamente' : data.data.message,
        data.data.correct ? 'success' : 'danger'
      );
      if(data.data.correct){
        
      }
    } catch (error) {
      this.general.showMessage("Error, no se ha podido programar el producto", 'danger'); return;
    }
  }

  async buildMessage(Message : string){
    this.loading = await this.Load.create({
      message: Message, 
      spinner: 'bubbles',
    });
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  getFirstDate() : string{
    let value;
    if(this.Programation.fechasProgramadas.length>0){
      let fecha = new Date(this.Programation.fechasProgramadas[0].fecha);
      value = this.obtenerDiaSemana(fecha) + ' '+ fecha.getDate() + " de " + this.obtenerNombreMes(fecha) + " " + this.obtenerAnio(fecha);
    }
    
    return value ? value : "";
  }
  

  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = fecha.getUTCDay();
    return diasSemana[indiceDia];
  }
  obtenerNombreMes(fecha: Date): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const indiceMes = fecha.getUTCMonth();
    return meses[indiceMes];
  }
  obtenerAnio(fecha: Date): string {
    const year = fecha.getUTCFullYear();
    return year.toString();
  }
}
