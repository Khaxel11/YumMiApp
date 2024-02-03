import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[focus]',
})
export class FocusDirective implements AfterViewInit {
  @Input() private focus = false;

  constructor(public element: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (this.focus) {
      setTimeout(() => this.element.nativeElement.focus(), 0);
    }
  }
}
