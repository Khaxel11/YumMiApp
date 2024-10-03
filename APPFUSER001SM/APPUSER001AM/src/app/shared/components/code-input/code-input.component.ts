import { Component, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css']
})
export class CodeInputComponent implements OnInit {
  @ViewChildren('authInput0, authInput1, authInput2, authInput3, authInput4') inputElements: QueryList<IonInput>;
  @Output() code: string;
  
  inputs = [
    { value: '', isError: false },
    { value: '', isError: false },
    { value: '', isError: false },
    { value: '', isError: false },
    { value: '', isError: false },
  ];

  focusedIndex: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  // Obtener el código completo concatenado
  getCode(): string {
    return this.inputs.map(input => input.value).join('');
  }

  // Poner todos los inputs en error
  setAllError(): void {
    this.inputs.forEach(input => input.isError = true);
  }

  // Limpia el estado de error de todos los inputs
  clearAllError(): void {
    this.inputs.forEach(input => input.isError = false);
  }
  clearCode() : void{
    this.inputs.forEach(input =>{
      input.isError = false;
      input.value = '';
    } );
  }
  onInputCode(event: any, index: number) {
    const value = event.detail.data;
    this.inputs[index].value = value;

    if (value === '') {
      this.inputs[index].isError = true;
    } else {
      this.inputs[index].isError = false;
    }

    if (value && index < this.inputs.length - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (index > 0 && !this.inputs[index].value) {
        this.focusInput(index - 1);
      }
    }
  }

  onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const pastedData = (event.clipboardData || (window as any).clipboardData).getData('text');

    if (pastedData.length <= this.inputs.length) {
      for (let i = 0; i < pastedData.length; i++) {
        this.inputs[i].value = pastedData[i];
      }
      const nextIndex = pastedData.length < this.inputs.length ? pastedData.length : this.inputs.length - 1;
      setTimeout(() => this.focusInput(nextIndex), 0);
    }
  }

  onFocus(event: Event, index: number) {
    this.focusedIndex = index;
  }

  private focusInput(index: number) {
    setTimeout(() => {
      const inputElementsArray = this.inputElements.toArray();
      if (index >= 0 && index < inputElementsArray.length) {
        const inputElement = inputElementsArray[index];
        if (inputElement) {
          inputElement.setFocus(); 
        }
      }
    }, 0);
  }
}
