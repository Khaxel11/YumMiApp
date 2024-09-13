import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PromocionesService } from 'src/app/services/promociones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mdl-promociones',
  templateUrl: './mdl-promociones.component.html',
  styleUrls: ['./mdl-promociones.component.css']
})
export class MdlPromocionesComponent implements OnInit {


  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapturaPromociones') mdlCapturaPromociones : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';
  opcion : number = 1;

  idPromo : number;
  codigo: string;
  descripcion : string;
  descuento:string;
  fechaInicio:string;
  fechaFin:string;
  disponibles: number;
  esProgramado:string;
  esAcumulable:string;
  valorAcumulable:number;
  cantidadAcumulable:number;
  programado : boolean = false;
  acumulado: boolean=false;
  constructor(private modalService : NgbModal, private service : PromocionesService) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaPromociones, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){
    this.codigo = "";
    this.descripcion = "";
    this.descuento="";
    this.disponibles=null;
    this.esProgramado="";
    this.esAcumulable="";
    this.fechaInicio="";
    this.fechaFin="";
    this.valorAcumulable=null;
    this.cantidadAcumulable=null;
    this.idPromo = null;

    // this.foto = "";
    this.onClose.emit(true);
    this.modalRef.close();
    
  }

  async savePromos(){
    //SIMPLIFICADO

    if(!this.codigo || !this.descuento || !this.descripcion){
      Swal.fire("Debe completar los campos: Código, Descripción y Descuento cuando la promoción no tiene condiciones.");
      return; 
    }

    let promocion = {
      idPromo : this.idPromo ? this.idPromo : 0,
      codigo : this.codigo,
      descripcion : this.descripcion,
      descuento: this.descuento,
      disponibles: 0,
      esProgramado: false,
      esAcumulable: false,
      fechaInicio:'',
      fechaFin:'',
      valorAcumulable:0,
      cantidadAcumulable:0
      
    }
    if(this.programado){
      if(!this.fechaFin || !this.fechaInicio || !this.disponibles ){
        Swal.fire('¡Aviso!',"Cuando una promocion es programada debe de llevar fecha inicio y fin y disponibles hasta agotar existencias.", 'info');
        return;
      }
       const fechaInicioDate = new Date(this.fechaInicio);
       const fechaFinDate = new Date(this.fechaFin);
       
       if (fechaInicioDate > fechaFinDate) {
           Swal.fire('¡Aviso!', "La fecha de inicio debe ser menor o igual que la fecha de fin y la fecha de fin debe ser mayor o igual que la fecha de inicio.", 'info');
           return;
       }

      promocion.esProgramado = true;
      promocion.fechaFin = this.fechaFin;
      promocion.fechaInicio = this.fechaInicio;
      promocion.disponibles = this.disponibles
    }
    if(this.acumulado){
      if(!this.valorAcumulable || !this.cantidadAcumulable ){
        Swal.fire('¡Aviso!',"Cuando una promocion es acumulable debe de llevar valor incremental y cantidad incremental.", 'info');
        return;
      }
      promocion.esAcumulable = true;
      promocion.valorAcumulable = this.valorAcumulable;
      promocion.cantidadAcumulable = this.cantidadAcumulable;
      
    }

    try {
      let data = await this.service.controlPromos(this.opcion, promocion);
      if(!data.correcto){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire('Promoción Guardada', 'Se ha guardado correctamente','success' )
      this.closeModal();
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
    }
  }

  onChangeCondicion(){
    
    this.acumulado=false;
    this.programado=false;
  }

}
