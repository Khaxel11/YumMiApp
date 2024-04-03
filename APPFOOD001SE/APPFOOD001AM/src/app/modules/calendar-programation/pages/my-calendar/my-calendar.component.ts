import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ProgramacionAgrupada } from 'src/app/models/Programation';
import { ProgramationService } from 'src/app/services/App/programation.service';
import { CalendarDetailComponent } from '../../components/calendar-detail/calendar-detail.component';
import { AlertController, ModalController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';
import { SheetModalComponent } from 'src/app/shared/components/sheet-modal/sheet-modal.component';
import { FoodHub } from 'src/app/models/FoodHub';
import { FoodHubService } from 'src/app/services/App/food-hub.service';
import { SafeUrl } from '@angular/platform-browser';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
class FiltrosAplicables {
  FoodHub: boolean;
  valueFoodHub: number;
  itemFoodHub: any;
  Estado: boolean;
  valueEstado: number;
  itemEstado: any;
  stringEstado: string;
  Producto: boolean;
  valueProducto: number;
  itemProducto: any;
  Categoria: boolean;
  valueCategoria: number;
  itemCategoria: any;
  TipoAlimentacion: boolean;
  valueTipoAlimentacion: number;
  itemTipoAlimentacion: any;

}
@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(1000, [animate('0.5s', style({ opacity: 1 }))])
        ], { optional: true }
        )
      ])
    ])
  ]
})
export class MyCalendarComponent implements OnInit {
  @ViewChild('mdlDetail') public mdlDetail: CalendarDetailComponent;
  @ViewChild('templateFoodHub') public templateFoodHub: any;
  @ViewChild('templateEstados') public templateEstados: any;
  general = new General();
  lstFechas = new Array<ProgramacionAgrupada>();
  MESSAGE = new MESSAGE();
  fecha: string;

  show = true;
  public loaded = false;

  sort: boolean = false;
  lstFiltros = [];

  //#region FILTROS DE FOOFHUBS
  lstFoodHub = new Array<FoodHub>();
  lstAllFoodHubs = new Array<FoodHub>();
  selectedIdFoodHub: Number = 0;

  lstEstados = [];
  lstMunicipio = [];


  filtro: string;
  filtrosAplicables = new FiltrosAplicables();
  public results = [...this.lstFoodHub];


  //#endregion

  //#region OBJETOS DE VISTA DE LOS FILTROS

  //#endregion
  ngOnInit() {
    this.filtrosAplicables.valueEstado = Number(sessionStorage.getItem("IdEstado"));

    this.filtrosAplicables.itemEstado = Number(sessionStorage.getItem("IdMunicipio"));
    this.fecha = this.general.setDate();
    this.show = !this.show;
    // setTimeout(() => {
    //   this.show = !this.show;
    // }, 0);
    this.getFechasProgramadas();
    
  }
  constructor(private service: ProgramationService, private modalController: ModalController, private alertController: AlertController,
    private serviceFH: FoodHubService, private serviceKS : KitchenService) {
    this.lstFiltros = [{
      id: 1,
      nombre: "FoodHub"
    },
    {
      id: 2,
      nombre: "Lugar"
    },
    {
      id: 3,
      nombre: "Producto"
    },
    {
      id: 4,
      nombre: "Categoria"
    },
    {
      id: 5,
      nombre: "Tipo Alimentacion"
    }]
    this.formatList();
  }


  async openMdlFoodHubs() {
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateFoodHub
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
        this.filtrosAplicables.itemFoodHub = data.data;
      }
    })
    await modal.present();
  }
  async openMdlEstados(){
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: false,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateEstados
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
        this.filtrosAplicables.itemEstado = data.data;
      }
    })
    await modal.present();
  }
  async sortFilter() {
    this.lstFiltros.sort((a, b) => {
      if (b.selected - a.selected !== 0) {
        return b.selected - a.selected;
      }
      return a.id - b.id;
    });
  }
  clearFilters() {
    this.sort = false;
    this.formatList();
    this.sortFilter();
    this.getFechasProgramadas();

  }
  removeFoodHub() {
    this.filtrosAplicables.FoodHub = false;
    this.filtrosAplicables.valueFoodHub = undefined;
    this.filtrosAplicables.itemFoodHub = undefined;
    
    this.removeSelected(1);
    this.onSelected();
    this.sortFilter();
  }
  removeSelected(value: number) {
    this.lstFiltros.forEach(filtro => {
      if (filtro.id === value && filtro.selected === true) {
        filtro.selected = false;
      }
    });
  }
  async selectedFilter(e: any) {

    /*PARA ABRIR EL MODAL SI YA ESTA ACTIVO EL FILTRO Y CAMBIARLO*/
    if (e.id === 1 && e.selected) {
      await this.openMdlFoodHubs();
      return;
    }
    if(e.id === 2 && e.selected){
      await this.openMdlEstados();
      return;
    }
    e.selected = !e.selected;

    /*ACOMODAR SI SE SELECCIONA*/
    this.onSelected();
    this.sortFilter();

    /*ABRIR SI APENAS SE SELECCIONO POR PRIMERA VEZ Y CARGAR LAS LISTAS SI ESTAN VACIAS PARA RENDIMIENTO MEJORADO*/
    if (e.id === 1 && e.selected) {
      if (this.lstFoodHub.length === 0) {
        await this.getFoodHubs();
      }
      this.filtrosAplicables.FoodHub = true;
      await this.openMdlFoodHubs();
    } else if (e.id === 1 && !e.selected) {
      this.filtrosAplicables.FoodHub = false;
      this.filtrosAplicables.valueFoodHub = undefined;
      this.filtrosAplicables.itemFoodHub = undefined;
    }
    if(e.id === 2 && e.selected){
      
      if(this.lstEstados.length === 0){
        this.getEstados();
        this.getMunicipios();
      }
      this.filtrosAplicables.Estado = true;
      
      await this.openMdlEstados();
    }

  }
  formatList() {
    this.lstFiltros.forEach(element => {
      element.selected = false;
    });
  }
  filterValueSelected(value: number): boolean {

    return this.lstFiltros.some(filtro => filtro.id === value && filtro.selected === true);

  }

  onSelected() {
    const haySeleccionados = this.lstFiltros.some(filtro => filtro.selected === true);
    if (haySeleccionados) {
      this.sort = true;
    } else {
      this.sort = false;
    }
  }
  async antMonth() {
    const fechaOriginal = new Date(this.fecha);

    const fechaAnterior = new Date(fechaOriginal.getFullYear(), fechaOriginal.getMonth() - 1, fechaOriginal.getDate());

    if (fechaAnterior.getMonth() === 11 && fechaOriginal.getMonth() === 0) {
    }


    this.fecha = this.formatDate(fechaAnterior.getFullYear(), fechaAnterior.getMonth() + 1, fechaOriginal.getDate());
    await this.onChangeMonth();
  }

  async nextMonth() {
    const fechaOriginal = new Date(this.fecha);
    const fechaSiguiente = new Date(fechaOriginal.getFullYear(), fechaOriginal.getMonth() + 1, fechaOriginal.getDate());



    this.fecha = this.formatDate(fechaSiguiente.getFullYear(), fechaSiguiente.getMonth() + 1, fechaSiguiente.getDate());
    await this.onChangeMonth();
  }

  formatDate(year: number, month: number, day: number): string {
    const formattedMonth = (month < 10) ? '0' + month : month;

    const formattedDay = (day < 10) ? '0' + day : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  async onChangeMonth() {
    await this.getFechasProgramadas();
  }
  async getFechasProgramadas() {
    this.loaded = false;
    setTimeout(async () => {
      try {
        let data = await this.service.getFechasProgramadas(this.fecha);
        if (data) {
          this.lstFechas = data.data;
          this.loaded = true;
        }
      } catch (error) {

      }
    }, 1000);
  }
  async deleteArchiveDate(value : any){
    if(value.diasPorConfirmar <= 0){
      const alert = await this.alertController.create({
        header: '¿Estas seguro de archivar el pedido?',
        message: "El pedido archivado se quitara de la lista, para verlo revisa el archivo de pedidos anteriores",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
  
            }
          }, {
            text: 'Archivar',
            handler: async () => {
              
            }
          }
        ]
      });
      await alert.present();
      return;
    }
    if(value.diasPorConfirmar <= 3){
      this.general.showMessage("El producto ha superado el límite de días permitidos para cancelar un pedido. De acuerdo con nuestras políticas, estás obligado a preparar y entregar el pedido según lo programado.", "danger", "Aceptar", "bottom", 100000);
      return;
    }else{
      const mensaje = Number(value.interesados) === 0 ?
        'El pedido no estara disponible para las proximas personas interesadas' 
        :
        `Actualmente, hay ${value.interesados} personas registradas para este pedido. Desea confirmar la eliminación del pedido a pesar de los interesados existentes. Por favor, considera que cancelar un pedido con interesados puede afectar los comentarios de tus clientes.`
      const alert = await this.alertController.create({
        header: '¿Estas seguro de eliminar el pedido?',
        message: mensaje,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
  
            }
          }, {
            text: 'Eliminar',
            handler: async () => {
              
            }
          }
        ]
      });
      await alert.present();
      return;
    }
  }
  async confirmDate(value: any) {
    if(value.confirmado){
      const alert = await this.alertController.create({
        header: '¿Estas seguro de cerrar el pedido?',
        message: "Actualmente, hay " + value.interesados + " personas registradas. Si cierras el pedido ahora, ten en cuenta que no se permitirá el registro de más personas y deberás asegurarte de entregar la comida a aquellos que ya están registrados.",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
  
            }
          }, {
            text: 'Cerrar pedido',
            handler: async () => {
              
            }
          }
        ]
      });
      await alert.present();
      return;
    }
    if (value.diasPorConfirmar <= 1 || !value.diasPorConfirmar) {
      this.general.showMessage("El producto ha pasado el limite de dias permitido por confirmar un producto. No sera publicado", "danger", "", "bottom", 5000);
      return;
    }

    const alert = await this.alertController.create({
      header: '¿Confirmas la preparación del producto para el  día indicado?',
      message: 'Recuerda que una vez confirmado el producto estara disponible para tus clientes y tendrás la responsabilidad de entregarlo en el lugar indicado',
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
            let data = await this.service.confirmFecha(value.idFechaProgramada, value.idProgramacion);
            if (!data) {
              this.general.showMessage(this.MESSAGE.ERROR, "danger");
              return;
            }
            this.general.showMessage(
              data.data.correct ? 'Pedido Confirmado y Publicado Correctamente. ¡Gracias! Te estaremos esperamos en ' + value.nombreFoodHub : data.data.message,
              data.data.correct ? 'success' : 'danger'
            );
            if (data.data.correct) {
              this.getFechasProgramadas();
            }
          }
        }
      ]
    });
    await alert.present();

  }
  async selectedDate(e: any) {

    const modal = await this.modalController.create({
      component: CalendarDetailComponent,
      componentProps: {
        programacion: e
      },
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data === true) {
      }
    })

    await modal.present();
  }
  //#region FUNCIONES PARA FOODHUBS
  
  async getFoodHubs() {

    let data = await this.serviceFH.getMyFoodHubs();
    this.lstFoodHub = data.data;
    this.lstAllFoodHubs = data.data;
    this.selectedIdFoodHub = 0;

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
  selectFilteredHub(e: any) {
    this.results = this.lstAllFoodHubs.filter((d) => d.nombreHub.toLowerCase().indexOf(e.nombreHub.toLowerCase()) > -1);
    this.lstFoodHub = this.results;
  }
  selectFoodHub(e: any) {
    this.modalController.dismiss(e);
  }
  //#endregion termina foodhubs
  //#region empieza estados
  async getEstados(){
    let data = await this.serviceKS.getUbication(2, 1);
    this.lstEstados = data.data;
    // this.selectedEstado = 
  }
  async onChangeEstado(){
    await this.getMunicipios();
  }
  async getMunicipios(){
    let data = await this.serviceKS.getUbication(3,this.filtrosAplicables.valueEstado)
    this.lstMunicipio = data.data;
    
  }
  closeMdlEstado(){
    if(!this.filtrosAplicables.stringEstado || this.filtrosAplicables.stringEstado === ""){
      this.removeSelected(2);
      this.onSelected();
      this.sortFilter();
      this.filtrosAplicables.Estado = false;
    }
    
    this.modalController.dismiss();
  }

  aceptarEstado(){
    const estado = this.lstEstados.find(item => item.IdEstado === this.filtrosAplicables.valueEstado);
    const municipio = this.lstMunicipio.find(item => item.IdMunicipio === this.filtrosAplicables.itemEstado);
    this.filtrosAplicables.stringEstado = municipio.Nombre + ', ' + estado.Nombre;
    this.modalController.dismiss();

  }
  removeEstado() {
    this.filtrosAplicables.Estado = false;
    this.filtrosAplicables.valueEstado = Number(sessionStorage.getItem("IdEstado"));
    this.filtrosAplicables.itemEstado = Number(sessionStorage.getItem("IdMunicipio"));
    this.filtrosAplicables.stringEstado = undefined;
    this.removeSelected(2);
    this.onSelected();
    this.sortFilter();
  }
  //#endregion termina estados
}
