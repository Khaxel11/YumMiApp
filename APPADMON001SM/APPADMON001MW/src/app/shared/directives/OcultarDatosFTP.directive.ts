import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'ngccs-archivos[Ocultar]',
})
export class OcultarDatosFTPDirective implements AfterViewInit {
  @Input() private Ocultar = false;
  constructor(public element: ElementRef<any>) {}

  ngAfterViewInit(): void {
    if (this.Ocultar) {
      let Componetes = this.element.nativeElement.children[0].children[0]
        .children;
      for (let index = 0; index < Componetes.length; index++) {
        if (Componetes[index].nodeName === 'P') {
          Componetes[index].id = 'BorrarP';
          Componetes[index].style.display = 'none';
        }
      }
    }
  }
}
