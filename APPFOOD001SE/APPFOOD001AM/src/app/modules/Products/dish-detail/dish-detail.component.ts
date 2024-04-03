import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { SharedDataService } from 'src/app/services/common/SharedService';
import { ProductsService } from 'src/app/services/products/products.service';
import { HorizontalListComponent } from 'src/app/shared/components/horizontal-list/horizontal-list.component';
import { MdlCapturePricesComponent } from '../mdl-capture-prices/mdl-capture-prices.component';
import { element } from 'protractor';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  @ViewChild('list', { read: ElementRef }) lista: HorizontalListComponent;
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('backgroundImage', { read: ElementRef }) backgroundImage: ElementRef;
  @ViewChild('faded', { read: ElementRef }) faded: ElementRef;
  @ViewChild('tittle', { read: ElementRef }) tittle: ElementRef;
  startTop: number;
  startHeight: number;
  startImageSize: number;

  Producto: Product = new Product();
  enableEdit : boolean = false;

  borderRadiusSet = false; // Variable para rastrear si ya se ha establecido el radio de borde
  allowScroll = false; // Variable para controlar si el desplazamiento está permitido

  enableEditName : boolean = false;
  enableEditDescription : boolean = false;

  @Input() productImage: string;
  productName: string = "Nombre del Producto";
  items: any = [];
  lstIngredientes = [];
  lstPrecios = [];
  lstCategorias = [];
  copyOfPrices = [];
  datosCargados : boolean = false;

  precio = {
    idProducto: '',
    precioUnidad: null,
    cantidadMinima: null,
    cantidadMaxima: null,
  };

  constructor(private modalController: ModalController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private service: ProductsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.sharedDataService.producto.subscribe(producto => {
      this.Producto = producto
      if(!this.Producto){
        this.navCtrl.navigateBack("/products/catalog")
      }
    });
    await this.getInfoProducto().then(
      ()=>{this.datosCargados = true}
    );

    this.items = [
      { expanded: false },
    ];

  }
  enabledEdition(){
    this.enableEdit = !this.enableEdit;
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  async getInfoProducto() {
    let data = await this.service.getInfoProduct(this.Producto.idProducto);
    console.log(data);
    
    this.lstIngredientes = data.data;
    this.lstCategorias = data.data2;
    this.copyOfPrices = data.data3;
    this.lstPrecios = data.data3;
    //this.lista.options = this.lstIngredientes;
    
  }

  selectedIngrediente(e: any) {
    console.log(e);
  }

  selectedCategory(e : any){
    this.lstCategorias = this.lstCategorias.filter(item => item.id !== e.id);

  }
  goBack() {
    this.navCtrl.navigateBack("/products/catalog");
  }
  closeModal() {
    this.modalController.dismiss();
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }

  goToProgramation(){
    this.sharedDataService.setProducto(this.Producto)
    this.navCtrl.navigateForward('/programation');
  }
  
async openMdlPriceDetail(e : any){
    
    const modal = await this.modalController.create({
      component: MdlCapturePricesComponent,
      componentProps: {
        idProducto : this.Producto.idProducto,
        nombre : this.Producto.nombreProducto,
        lstPrices : this.lstPrecios
      },
    });
     modal.onWillDismiss().then( async(data : any)=> {
      await this.getInfoProducto();
      // if(data === true){
        
        
      //   return;
      // }else{
      //   this.lstPrecios = data;
      //   return;
      // }
    })

    await modal.present();
  }


  //#region EVENTOS PARA DESPLAZAMIENTO DE DETALLE
  onTouchStart(event: TouchEvent) {
    this.startTop = this.container.nativeElement.offsetTop;
    this.startHeight = this.container.nativeElement.offsetHeight;
    this.startImageSize = this.backgroundImage.nativeElement.offsetHeight;
  }
  reachedTop = false;
  onTouchMove(event: TouchEvent) {
    if (this.startTop !== undefined && this.startHeight !== undefined && this.startImageSize !== undefined) {
      const deltaY = event.touches[0].clientY - this.startTop;
      const newTop = this.startTop + deltaY;

      const upperLimit = 40;
      const lowerLimit = window.innerHeight / 2;
      const maxOpacity = 0.8;
      const opacity = maxOpacity - (lowerLimit - Math.abs(newTop)) / lowerLimit;

      const maxFont = 25;

      const gradientOpacity = 1 - Math.abs(newTop) / lowerLimit;

      if (newTop >= upperLimit && newTop <= lowerLimit) {
        this.container.nativeElement.style.top = newTop + 'px';
        this.container.nativeElement.style.height = (this.startHeight - deltaY) + 'px';
        this.faded.nativeElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, 0))`;


      }
      if (newTop >= upperLimit && newTop <= (upperLimit + 10) && !this.reachedTop) {
        this.container.nativeElement.style.borderRadius = '0 0 0 0';
        // this.tittle.nativeElement.classList.add('fadeOut');


        this.reachedTop = true;
      } else if (newTop > (upperLimit + 10)) {
        this.reachedTop = false;
        this.container.nativeElement.style.borderRadius = '20px 20px 0 0';
        // this.tittle.nativeElement.classList.remove('fadeOut');


      }

      if (!this.reachedTop) {

        this.tittle.nativeElement.classList.add('active');
      }
      if (this.reachedTop) {
        this.allowScroll = true;
      } else {
        this.allowScroll = false;
      }

      this.startTop = newTop;
    }
  }
  onTouchEnd() {
    this.startTop = undefined;
    this.startHeight = undefined;
    this.startImageSize = undefined;
  }

  //#endregion
  
}
