import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CargosService } from 'src/app/services/cargos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mdl-captura-tipo',
  templateUrl: './mdl-captura-tipo.component.html',
  styleUrls: ['./mdl-captura-tipo.component.css']
})
export class MdlCapturaTipoComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapturaTipo') mdlCapturaTipo : any;
  modalRef : NgbModalRef;
  modalname = "Agregar"
  TipoOpcion: number =1;
  

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }
  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaTipo, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }

  closeModal(){
    this.modalRef.close();
  }
}
