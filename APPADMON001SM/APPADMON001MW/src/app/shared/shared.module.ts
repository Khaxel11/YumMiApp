import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FloatLabelTextboxComponent } from './components/float-label-textbox/float-label-textbox.component';

//import { RangedateselectionComponent } from './components/rangedateselection/rangedateselection.component';

// Achivos
import { NgccsArchivosModule } from 'ngccs-archivos';

// Grid
import { AgGridModule } from 'ag-grid-angular';
import { GridCsComponent } from './components/grid-cs/grid-cs.component';
import { GridSsComponent } from './components/grid-ss/grid-ss.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BtnCellRenderComponent } from './components/btn-cell-render/btn-cell-render.component';

// Directive
import { AgregarIdFTPDirective } from './directives/AgregarIdFTP.directive';
import { FocusDirective } from './directives/focus.directive';
import { OcultarDatosFTPDirective } from './directives/OcultarDatosFTP.directive';
import { OnlynumberDirective } from './directives/onlynumber.directive';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Componentes
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
// import { BuscarUsuarioERPComponent } from './components/buscar-usuario-erp/buscar-usuario-erp.component';

// import { ZonaComponent } from './components/zona/zona.component';

import { NgModalComponent } from './components/ng-modal/ng-modal.component';

import { CustomTextboxComponent } from './components/custom-textbox/custom-textbox.component';

import { InputCamposobligatoriosComponent } from './components/input-camposobligatorios/input-camposobligatorios.component';

import { CmbEditorComponent } from './components/cmb-editor/cmb-editor.component';

import { ChkCellRenderComponent } from './components/chk-cell-render/chk-cell-render.component';
import { HybridCellRenderComponent } from './components/hybrid-cell-render/hybrid-cell-render.component';

import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ListElementsComponent } from './components/list-elements/list-elements.component';
import { ChartCsComponent } from './components/chart-cs/chart-cs.component';
@NgModule({
  declarations: [
    PaginationComponent,
    BtnCellRenderComponent,
    ChkCellRenderComponent,
    HybridCellRenderComponent,
    FloatLabelTextboxComponent,
    GridCsComponent,
    GridSsComponent,
    FocusDirective,
    OnlynumberDirective,
    NgModalComponent,
    AutoCompleteComponent,
    CustomTextboxComponent,
    OcultarDatosFTPDirective,
    AgregarIdFTPDirective,
    InputCamposobligatoriosComponent,
    CmbEditorComponent,
    CmbEditorComponent,
    HybridCellRenderComponent,
    DatePickerComponent,
    ListElementsComponent,
    ChartCsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([
      BtnCellRenderComponent,
      ChkCellRenderComponent,
      HybridCellRenderComponent,
      CmbEditorComponent
    ]),
    // NgccsArchivosModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PaginationComponent,
    BtnCellRenderComponent,
    ChkCellRenderComponent,
    HybridCellRenderComponent,
    CmbEditorComponent,
    FloatLabelTextboxComponent,
    FocusDirective,
    GridCsComponent,
    GridSsComponent,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule,
    // NgccsArchivosModule,
    OnlynumberDirective,
    NgModalComponent,
    OcultarDatosFTPDirective,
    CustomTextboxComponent,
    CustomTextboxComponent,
    AgregarIdFTPDirective,
    InputCamposobligatoriosComponent,
    DatePickerComponent,
    ListElementsComponent,
    ChartCsComponent
  ],
  bootstrap: []
})
export class SharedModule { }
