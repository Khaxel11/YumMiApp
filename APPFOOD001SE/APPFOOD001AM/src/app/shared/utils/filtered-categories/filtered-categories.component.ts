import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { ProductsService } from 'src/app/services/products/products.service';
import { MdlFilterComponent } from './mdl-filter/mdl-filter.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'filtered-categories',
  templateUrl: './filtered-categories.component.html',
  styleUrls: ['./filtered-categories.component.css']
})
export class FilteredCategoriesComponent implements OnInit {
  lstFiltros = [];
  general = new General();
  lstCategory = [];
  sort : boolean = false;
  constructor(
    private service : ProductsService,
    private navCtr : NavController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getFiltros();
    this.getCategory();
  }
  async getCategory(){
    try {
      let data = await this.service.getTiposComida();
      
      this.lstCategory = data.data3;

      //this.lstCategory = [...this.lstCategory];

      this.formatList();
    } catch (error) {
      
    }
  }
  
  formatList(){
    this.lstCategory.forEach(element => {
      element.selected = false;
    });
    this.lstFiltros.forEach(element => {
      element.selected = false;
    });
  }
  selectedFilter(e : any){
  
    e.selected = !e.selected;
    this.onSelected();
    this.sortFilter();
  }
  selectedCategory(e : any){
    const haySeleccionados = this.lstCategory.some(filtro => filtro.selected === true);
    if(!haySeleccionados){
      e.selected = !e.selected;
    }else{
      e.selected = false;
    }
    //this.sortCategory();
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
  /*async sortCategory(){
    this.lstCategory.sort((a, b) => {
      if (b.selected - a.selected !== 0) {
        return b.selected - a.selected;
      }
      return a.IdCategoria - b.IdCategoria;
    });
  }*/


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
        lstFiltros : this.lstFiltros,
        lstCategory : this.lstCategory
      },
    });
     modal.onWillDismiss().then( async(data)=> {
      
      if(data.data){
        this.onSelected();
        this.sortFilter();
      }
    })

    await modal.present();
  }

  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }   
}
