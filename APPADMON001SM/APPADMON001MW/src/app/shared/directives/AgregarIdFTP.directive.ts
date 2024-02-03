import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'ngccs-archivos[Id]',
})
export class AgregarIdFTPDirective implements AfterViewInit {
  @Input() private Id = '';
  constructor(public element: ElementRef<any>) {}

  ngAfterViewInit(): void {
      const Componetes = this.element.nativeElement.children[0].children[0].children;
      for (const iterator of Componetes) {
        if (iterator.nodeName === 'INPUT') {
          iterator.id = this.Id;
      }
    }
  }
}
