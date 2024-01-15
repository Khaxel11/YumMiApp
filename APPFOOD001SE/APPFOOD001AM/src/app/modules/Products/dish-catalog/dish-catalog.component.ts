import { Component, OnInit } from '@angular/core';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dish-catalog',
  templateUrl: './dish-catalog.component.html',
  styleUrls: ['./dish-catalog.component.css']
})
export class DishCatalogComponent implements OnInit {
  selectedProduct: any;

  platillos = [
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    { nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1', imagen: '../../../../assets/Images/gato.jpg' },
    
  ];
  modalController: any;
  
  constructor(private navCtrl: NavController) { }

  ngOnInit(): void {
  }
  async showProductDetails(product: any) {
    this.navCtrl.navigateForward('/products/catalog/detail', {
      // state: {
      //   productName: product.nombre,
      //   productImage: product.imagen,
      // },
    });
  }
  async goToCapture(){
    this.navCtrl.navigateForward('/products/capture', {});
  }
}
