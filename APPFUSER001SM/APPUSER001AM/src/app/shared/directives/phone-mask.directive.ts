import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[PhoneMask]'
})
export class PhoneMaskDirective {
  private regex: RegExp = new RegExp(/^\d{0,10}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value.replace(/\D/g, '');
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    let value = this.el.nativeElement.value.replace(/\D/g, '');
    let formattedValue = this.formatPhone(value);
    this.el.nativeElement.value = formattedValue;
  }

  private formatPhone(value: string): string {
    if (value.length > 6) {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length > 3) {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}`;
    } else {
      return value;
    }
  }
}
