import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ProgramacionAgrupada } from 'src/app/models/Programation';
import { ProgramationService } from 'src/app/services/App/programation.service';
import { CalendarDetailComponent } from '../../components/calendar-detail/calendar-detail.component';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';
import { SheetModalComponent } from 'src/app/shared/components/sheet-modal/sheet-modal.component';
import { FoodHub } from 'src/app/models/FoodHub';
import { FoodHubService } from 'src/app/services/App/food-hub.service';
import { SafeUrl } from '@angular/platform-browser';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
class FiltrosAplicables {
  Clasificacion : boolean;
  valueClasificacion : number = undefined;
  itemClasificacion : any;
  FoodHub: boolean;
  valueFoodHub: number = undefined;
  itemFoodHub: any;
  Estado: boolean;
  valueEstado: number = undefined;
  itemEstado: any = undefined;
  stringEstado: string;
  Producto: boolean;
  valueProducto: number = undefined;
  itemProducto: any;
  Categoria: boolean;
  valueCategoria: number = undefined;
  itemCategoria: any;
  TipoAlimentacion: boolean;
  valueTipoAlimentacion: number = undefined;
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
  @ViewChild('templateProductos') public templateProductos: any;
  @ViewChild('templateCategorias') public templateCategorias: any;
  @ViewChild('templateTipoAlimentacion') public templateTipoAlimentacion: any;
  @ViewChild('templateClasificacion') public templateClasificacion: any;
  general = new General();
  lstFechas = new Array<ProgramacionAgrupada>();
  MESSAGE = new MESSAGE();
  fecha: string;

  show = true;
  public loaded = false;

  sort: boolean = false;
  lstFiltros = [];
  loading : any;
  //#region FILTROS DE FOOFHUBS
  lstFoodHub = new Array<FoodHub>();
  lstAllFoodHubs = new Array<FoodHub>();
  selectedIdFoodHub: Number = 0;

  lstEstados = [];
  lstMunicipio = [];
  selectedIdProducto : number = 0;

  filtro: string;
  //Filtros de productos
  lstProductos = new Array<any>();
  lstAllProductos = new Array<any>();
  

  lstClasificacion = new Array<any>();
  lstAllClasificacion = new Array<any>();
  selectedIdClasificacion : number = 0;
  lstCategorias = new Array<any>();
  lstAllCategorias = new Array<any>();
  selectedIdCategoria : number = 0;
  lstTipoAlimentacion = new Array<any>();
  lstAllTipoAlimentacion = new Array<any>();
  selectedIdTipoAlimentacion : number = 0;

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
    private serviceFH: FoodHubService, private serviceKS : KitchenService, private servicePr : ProductsService,
    private Load : LoadingController,) {
    this.lstFiltros = [
    {
      id: 0,
      nombre: "Clasificación"
    },
    {
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

  async handleRefresh(event) {
    await this.getFechasProgramadas().then(
      ()=>{
        event.target.complete();
      }
    )
      
  }


  async buildMessage(Message : string){
    this.loading = await this.Load.create({
      message: Message, 
    });
  }
  async openMdlProductos() {
    await this.buildMessage("Cargando...");
    await this.loading.present();
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateProductos
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
        this.filtrosAplicables.itemProducto = data.data;
        await this.getFechasProgramadas()
      }else{
        if(!this.filtrosAplicables.itemProducto){
          this.removeSelected(3);
          this.onSelected();
          this.sortFilter();
        }
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }
  async openMdlFoodHubs() {
    await this.buildMessage("Cargando...");
    await this.loading.present();
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
        await this.getFechasProgramadas()
      }else{
        if(!this.filtrosAplicables.itemFoodHub){
          this.removeSelected(1);
          this.onSelected();
          this.sortFilter();
        }
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }
  async openMdlEstados(){
    await this.buildMessage("Cargando...");
    await this.loading.present();
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
        this.filtrosAplicables.itemEstado = data.data.municipio;
        this.filtrosAplicables.valueEstado = data.data.estado;
        await this.getFechasProgramadas()
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }

  async openMdlCategorias() {
    await this.buildMessage("Cargando...");
    await this.loading.present();
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateCategorias
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
        this.filtrosAplicables.itemCategoria = data.data;
        await this.getFechasProgramadas()
      }else{
        if(!this.filtrosAplicables.itemCategoria){
          this.removeSelected(4);
          this.onSelected();
          this.sortFilter();
        }
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }
  async openMdlTipoAlimentacion() {
    await this.buildMessage("Cargando...");
    await this.loading.present();
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateTipoAlimentacion
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
        this.filtrosAplicables.itemTipoAlimentacion = data.data;
        this.filtrosAplicables.valueTipoAlimentacion = data.data.IdTipoAlimentacion;
        await this.getFechasProgramadas()
      }else{
        if(!this.filtrosAplicables.itemTipoAlimentacion){
          this.removeSelected(5);
          this.onSelected();
          this.sortFilter();
        }
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }
  async openMdlClasificacion() {
    await this.buildMessage("Cargando...");
    await this.loading.present();
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateClasificacion
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
        this.filtrosAplicables.itemClasificacion = data.data;
        this.filtrosAplicables.valueClasificacion = data.data.IdTipo;
        await this.getFechasProgramadas()
      }else{
        if(!this.filtrosAplicables.itemClasificacion){
          this.removeSelected(0);
          this.onSelected();
          this.sortFilter();
        }
      }
    })
    await modal.present();
    await this.loading.dismiss();
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
  async removeFoodHub() {
    this.filtrosAplicables.FoodHub = false;
    this.filtrosAplicables.valueFoodHub = undefined;
    this.filtrosAplicables.itemFoodHub = undefined;
    
    this.removeSelected(1);
    this.onSelected();
    this.sortFilter();

    await this.getFechasProgramadas();
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
    if(e.id === 0 && e.selected){
      await this.openMdlClasificacion();
      return;
    }
    if (e.id === 1 && e.selected) {
      await this.openMdlFoodHubs();
      return;
    }
    if(e.id === 2 && e.selected){
      await this.openMdlEstados();
      return;
    }
    if(e.id === 3 && e.selected){
      await this.openMdlProductos();
      return;
    }
    if(e.id === 4 && e.selected){
      await this.openMdlCategorias();
      return;
    }
    if(e.id === 5 && e.selected){
      await this.openMdlTipoAlimentacion();
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
        await this.getEstados();
        await this.getMunicipios();
      }
      this.filtrosAplicables.Estado = true;
      
      await this.openMdlEstados();
    }
    if(e.id === 3 && e.selected){
      if(this.lstProductos.length === 0){
        await this.getProductos();
      }
      this.filtrosAplicables.Producto = true;
      await this.openMdlProductos()
    }
    if(e.id === 4 && e.selected){
      if(this.lstCategorias.length === 0){
        await this.getTiposComida();
      }
      this.filtrosAplicables.Categoria = true;
      await this.openMdlCategorias()

    }
    if(e.id === 5 && e.selected){
      if(this.lstTipoAlimentacion.length === 0){
        await this.getTiposComida();
      }
      this.filtrosAplicables.TipoAlimentacion = true;
      await this.openMdlTipoAlimentacion()

    }
    if(e.id === 0 && e.selected){
      if(this.lstClasificacion.length === 0){
        await this.getTiposComida();
      }
      this.filtrosAplicables.Clasificacion = true;
      await this.openMdlClasificacion()

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
  buildFiltros(filtros: FiltrosAplicables): { [key: string]: string | number } {
    const resultado: { [key: string]: string | number } = {};
  
    // Iterar sobre todas las propiedades de FiltrosAplicables
    for (const prop in filtros) {
      if (prop.startsWith('value') || prop === "itemEstado") {        
          resultado[prop] = filtros[`${prop}`] ?? 0;
      }
    }
  
    return resultado;
  }
  async getFechasProgramadas() {
    this.loaded = false;


    setTimeout(async () => {
      try {
        const filtros = this.buildFiltros(this.filtrosAplicables);
        filtros.itemEstado = this.filtrosAplicables.Estado ? filtros.itemEstado : 0;
        // console.log(filtros);
        let data = await this.service.getFechasProgramadas(this.fecha, filtros );
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
    console.log(e);
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
    return  base64String ? imageUrl : '../../../../../assets/Images/no-image-svgrepo-com.svg';
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
    this.modalController.dismiss({estado : estado.IdEstado , municipio : municipio.IdMunicipio});

  }
  async removeEstado() {
    this.filtrosAplicables.Estado = false;
    this.filtrosAplicables.valueEstado = Number(sessionStorage.getItem("IdEstado"));
    this.filtrosAplicables.itemEstado = Number(sessionStorage.getItem("IdMunicipio"));
    this.filtrosAplicables.stringEstado = undefined;
    this.removeSelected(2);
    this.onSelected();
    this.sortFilter();
    await this.getFechasProgramadas();
  }
  //#endregion termina estados

  //#region PRODUCTOS
  handleChangeProducto(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.lstAllProductos.filter((d) => d.nombreProducto.toLowerCase().indexOf(query) > -1);

    this.lstProductos = this.results;
  }
  async getProductos(){
    let data = await this.servicePr.getProducts();
    this.selectedIdProducto = 0;
    if(data.data){
      this.lstProductos = data.data;
      this.lstAllProductos = data.data;
      
    }
  }
  selectProduct(e : any){
    this.modalController.dismiss(e);
  }
  async removeProducto() {
    this.filtrosAplicables.Producto = false;
    this.filtrosAplicables.valueProducto = undefined;
    this.filtrosAplicables.itemProducto = undefined;
    
    this.removeSelected(3);
    this.onSelected();
    this.sortFilter();
    await this.getFechasProgramadas();
  }
  //#endregion
  //#region CATEGORIAS
  handleChangeCategorias(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.lstAllCategorias.filter((d) => d.Categoria.toLowerCase().indexOf(query) > -1);

    this.lstCategorias = this.results;
  }
  handleChangeTipoAlimentacion(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.lstAllTipoAlimentacion.filter((d) => d.TipoAlimentacion.toLowerCase().indexOf(query) > -1);

    this.lstTipoAlimentacion = this.results;
  }
  handleChangeClasificacion(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.lstAllClasificacion.filter((d) => d.NombreTipo.toLowerCase().indexOf(query) > -1);

    this.lstClasificacion = this.results;
  }
  async getTiposComida(){
    //1 : Clasificacion, 2 : Tipo Alimentacion, 3 : Categorias
    let data = await this.servicePr.getTiposComida();
        this.selectedIdClasificacion = 0;
        this.selectedIdTipoAlimentacion = 0;
        this.selectedIdCategoria = 0;
       

    if(data.data){
      this.lstClasificacion = data.data;
      this.lstAllClasificacion = data.data;
      this.lstTipoAlimentacion = data.data2;
      this.lstAllTipoAlimentacion = data.data2;
      this.lstCategorias = data.data3;
      this.lstAllCategorias = data.data3;
    }
  }
  selectTipoComida(e : any){
    this.modalController.dismiss(e);
  }
  async removeCategoria() {
    this.filtrosAplicables.Categoria = false;
    this.filtrosAplicables.valueCategoria = undefined;
    this.filtrosAplicables.itemCategoria = undefined;
    
    this.removeSelected(4);
    this.onSelected();
    this.sortFilter();
    await this.getFechasProgramadas();
  }
  async removeTipoAlimentacion(){
    this.filtrosAplicables.TipoAlimentacion = false;
    this.filtrosAplicables.valueTipoAlimentacion = undefined;
    this.filtrosAplicables.itemTipoAlimentacion = undefined;
    
    this.removeSelected(5);
    this.onSelected();
    this.sortFilter();
    await this.getFechasProgramadas();
  }
  async removeClasificacion(){
    this.filtrosAplicables.Clasificacion = false;
    this.filtrosAplicables.valueClasificacion = undefined;
    this.filtrosAplicables.itemClasificacion = undefined;
    
    this.removeSelected(0);
    this.onSelected();
    this.sortFilter();
    await this.getFechasProgramadas();
  }
  //#endregion
}
