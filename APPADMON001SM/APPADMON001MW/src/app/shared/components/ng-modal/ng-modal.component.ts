import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-modal',
  templateUrl: './ng-modal.component.html',
  styleUrls: ['./ng-modal.component.css']
})
export class NgModalComponent implements OnInit {
  mdlRef: NgbModalRef;
  @ViewChild('mdl') private mdl: any;
  @Input() Titulo = '';
  @Input() IconoTitulo = '';
  @Input() Size = 'md';
  @Input() MostrarbtnAceptar = true;
  open = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  openModal(): void {
    this.open = true;

    this.mdlRef = this.modalService.open(this.mdl, {
      size: this.Size,
      backdrop: 'static',
    });
    this.mdlRef.result.then(
      (result) => { },
      (reason) => { }
    );
  }

  closeModal(): void {
    if (this.open) {
      this.mdlRef.close();
      this.open = false;
    }
  }
}
