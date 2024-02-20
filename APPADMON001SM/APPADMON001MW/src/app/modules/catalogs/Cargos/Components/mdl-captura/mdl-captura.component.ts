import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'mdl-captura-cargos',
  templateUrl: './mdl-captura.component.html',
  styleUrls: ['./mdl-captura.component.css']
})
export class MdlCapturaComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCaptura') mdlCaptura : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  claveCargo : string;
  nombreCargo : string;


  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }
  openModal(){
    this.modalRef = this.modalService.open(this.mdlCaptura, {
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
