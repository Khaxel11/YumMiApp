import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  miArregloDeDatos = [
    { nombre: 'As de Picas', valor: 1, ruta: '../../../../../../assets/images/6x7zre.jpg' },
    { nombre: 'Dos de Corazones', valor: 2, ruta: '../../../../../../assets/images/6x7zre.jpg' },
    { nombre: 'Tres de Diamantes', valor: 3, ruta: '../../../../../../assets/images/6x7zre.jpg'  },
    { nombre: 'Cuatro de Tréboles', valor: 4, ruta: '../../../../../../assets/images/6x7zre.jpg'  },
    { nombre: 'Cinco de Picas', valor: 5, ruta: '../../../../../../assets/images/6x7zre.jpg'  },
    { nombre: 'Cinco de Picas', valor: 6, ruta: '../../../../../../assets/images/sun-tornado.svg'  },
    // Agrega más cartas según sea necesario
  ];
}
