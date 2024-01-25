import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { element } from 'protractor';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-mdl-filter',
  templateUrl: './mdl-filter.component.html',
  styleUrls: ['./mdl-filter.component.css']
})
export class MdlFilterComponent implements OnInit {
  @Output() ItemData = new EventEmitter<any>();
  lstCategory = [];
  lstFiltros = [];
  constructor(private modalController: ModalController, 
    private service : ProductsService) { }

  ngOnInit(): void {
    
  }
  selectedCategory(e : any){
    const haySeleccionados = this.lstCategory.some(filtro => filtro.selected === true);
    if(!haySeleccionados){
      e.selected = !e.selected;
    }else{
      e.selected = false;
    }
  }
  selectedFilter(e : any){
      e.selected = !e.selected; 
  }

  clean(){
    this.lstCategory.forEach(element => {
      element.selected = false;
    });
    this.lstFiltros.forEach(element => {
      element.selected = false;
    });
  }
 
 

  closeModal(e? : any) {
    this.modalController.dismiss(e);
  }
  async returnFilters(){
    const Object = {
      lstCategory : this.lstCategory,
      lstFiltros : this.lstFiltros
    }
    //this.ItemData.emit(Object);
    this.closeModal(Object);

  }
}
