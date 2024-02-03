import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from '../../../models/common/pager';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() paginador: Pager;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  paginaSeleccionada(pagina: number): void {
    if (pagina > 0 && (this.paginador.lastPage >= pagina && !(pagina === this.paginador.currentPage && !this.paginador.firstGeneration))) {
      this.paginador.newCurrentPage = pagina;
      this.pageChange.emit(pagina);
    }
  }
}
