import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { ProductsService } from 'src/app/services/products/products.service';
import { MdlFilterComponent } from './mdl-filter/mdl-filter.component';

@Component({
  selector: 'filtered-categories',
  templateUrl: './filtered-categories.component.html',
  styleUrls: ['./filtered-categories.component.css']
})
export class FilteredCategoriesComponent implements OnInit {
  lstFiltros = [];
  general = new General();
  sort : boolean = false;
  constructor(
    private service : ProductsService,
    private navCtr : NavController,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.getFiltros();
  }
  selectedCategory(e : any){
  
    e.selected = !e.selected;
    this.onSelected();
    this.sortFilter();
  }
  onSelected(){
    const haySeleccionados = this.lstFiltros.some(filtro => filtro.selected === true);
    if(haySeleccionados){
      this.sort = true; 
    }else{
      this.sort = false;
    }
      
    
  }
  async sortFilter(){
    this.lstFiltros.sort((a, b) => {
      if (b.selected - a.selected !== 0) {
        return b.selected - a.selected;
      }
      return a.Id - b.Id;
    });
  }
  async getFiltros(){
    try {
      let data = await this.service.getFiltros();
      if(!data){
        this.general.showMessage("No se cargaron los filtros", "danger");
        this.navCtr.back();
        return;
      }
      this.lstFiltros = data.data;
      this.lstFiltros.forEach(element => {
        element.selected = false;
      });

    } catch (error) {
      this.general.showMessage("No se cargaron los filtros", "danger");
        this.navCtr.back();
        return;
    }

  }
  async openMdlFilters(e? : any){
    
    const modal = await this.modalController.create({
      component: MdlFilterComponent,
      componentProps: {
        lstFiltros : this.lstFiltros
      },
    });
     modal.onWillDismiss().then( async(data)=> {
      
      if(data.data === true){
        
      }
    })

    await modal.present();
  }
}
