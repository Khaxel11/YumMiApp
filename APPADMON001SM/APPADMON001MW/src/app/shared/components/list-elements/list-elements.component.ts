import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';

//Desarrollador por Axel Aguilar
//29/08/2023
//Objetivo: Poder listar datos de forma general y poder eliminarlos de la lista
interface itemData {
  id: number;
  nombre: string;
  value: number;
}
@Component({
  selector: 'list-elements',
  templateUrl: './list-elements.component.html',
  styleUrls: ['./list-elements.component.css']
})

export class ListElementsComponent implements OnInit {
  lista$: Observable<any[]>;
  @Input() Titulo = '';
  constructor() { }
  data: any[] = [];
  totalRecords = 0;
  keys : any;
  dataKey : number;
  dataIdKey : number;
  item : any;
  @Input() type = '';
  @Input() maxlength = '';
  @Input() event: any = {};
  @Input() Disabled = false;
  @Input() mosLabel = true;
  @Output() TextChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() DataChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get Data(): any[] {
    return this.data;
  }
  

  set Data(value: any[]) {
    this.data = this.adaptarLista(value);
    this.totalRecords = this.data.length;
    if(this.data.length > 0){
      this.keys = Object.keys(this.data[0]);
    }
    if(this.keys?.length > 1 ){
      this.dataKey = this.keys[1];
      this.dataIdKey = this.keys[0];
    }
    this.DataChange.emit(this.data);
  }
  @Input() get Item(): any {
    return this.item;
  }
  set Item(value: any) {
    this.item = value;
    this.DataChange.emit(this.data);
  }
  
  getItems() : any[]{ 
    return this.data;
  }


  ngOnInit(): void {
    
  }
  deleteItem(item: number) {
    //this.data = this.data.filter((item, index) => item[index] !== item);
    this.data.splice(item,1)
  }
  addItem(item : any){
    this.data.push(item);
  }

  obtenerKeyValue(obj: any): any[] {
    return Object.entries(obj);
  }

  adaptarLista(lista: any[]): itemData[] {
    // Realizar la adaptación de la lista para que cumpla con la estructura de itemData
    return lista.map(item => ({
      id: item.id || 0, 
      nombre: item.nombre || '', 
      value: item.value || 0 
    }));
  }
  refreshList(){
    // this.lista$ = this.data;
  }
  cleanData(){
    //this.Data = [];
    this.data = [];
  }
}
