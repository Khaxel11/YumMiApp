import swal from 'sweetalert2';
import { CurrencyPipe, formatNumber } from '@angular/common';
import { flatMap } from 'lodash-es';
import { data } from 'jquery';
//Desarrolla Axel Aguilar Alonso para facilitar el uso de distintas funciones en los proyectos de bancos
export class General {
  public readonly SYSTEM_MESSAGE : string = "Mensaje del Sistema";
  public readonly ERROR_MESSAGE : string = "Ha ocurrido un Error";
  public readonly MISSING_MESSAGE : string = "Faltan campos por capturar";
  public readonly OK_MESSAGE : string = "¡Correcto!";
  public readonly WARN_MESSAGE : string  = "¡Aviso!";
  public readonly ASK_MESSAGE : string = "¿Continuar?";
  public readonly DELETE_MESSAGE : string = "Eliminar";
   
  constructor(
  ){

  }

    
    setDayOfDate(typeOfDate : number = 1,  days : number = 0, months : number = 0, years? : number) : string{
      const date = new Date();
      let day : string = "";
      let month : string = "";
      let year : string = "";
      if(typeOfDate = 1){ //set Day
        
        date.setDate(date.getDate() - days);
        day = String(days)
        month = ((months + 1) + date.getMonth()).toString();
         year = date.getFullYear().toString();
      }
      if(typeOfDate = 2){ //set Month
        
        date.setDate(date.getDate() - days);
        day = date.getDate().toString();
        month = String(months);
         year = date.getFullYear().toString();
      }
      if(typeOfDate = 3){ //set Year
        
        date.setDate(date.getDate() - days);
        day = date.getDate().toString();
        month = ((months + 1) + date.getMonth()).toString();
         year = String(years);
      }

      if(typeOfDate = 4){ //firsDayOfMonth
        date.setDate(date.getDate() - days);
        day = String(1);
        month = ((months + 1) + date.getMonth()).toString();
         year = date.getFullYear().toString();
      }
      if (String(day).length === 1) {
        day = '0' + day;
      }
      if (month.length === 1) {
        month = '0' + month;
      }
      return year + '-' + month + '-' + day;
    }
    setDate(days: number = 0, months : number = 0): string {
        const date = new Date();
        date.setDate(date.getDate() - days);
        let day = date.getDate().toString();
        let month = ((months + 1) + date.getMonth()).toString();
        const year = date.getFullYear().toString();
    
        if (day.length === 1) {
          day = '0' + day;
        }
        if (month.length === 1) {
          month = '0' + month;
        }
    
        return year + '-' + month + '-' + day;
      }

      showMessage(mensaje: string, icono: number, tiempo: number = 2700): void {
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: tiempo
        });
    
        Toast.fire({
          icon: icono === 0 ? 'success' : icono === 2 ? 'info' : 'error',
          title: mensaje,
        });
      }
      showFloatingToast(mensaje, icono, tiempo = 2700) {
        const backgroundColor = icono === 0 ? 'green' : icono === 1 ? 'red' : 'blue';

        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: tiempo,
          customClass: {
            content: `background-${backgroundColor}`
          },
          showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation'
          },
          hideClass: {
            popup: ''
          }
        });
      
        Toast.fire({
          icon: icono === 0 ? 'success' : icono === 2 ? 'info' : 'error',
          title: mensaje,
        });
      }
      currencyToMXN(MXN: number): any {
        const currencyPipe = new CurrencyPipe('en-US');
        return currencyPipe.transform(MXN, '', 'symbol', '1.2-2');
      }
    
      currencyToDLLS(DLLS: number, ): any {
        const currencyPipe = new CurrencyPipe('en-US');
        return currencyPipe.transform(DLLS, '', 'symbol', '1.2-2');
      }
      
      currencyFormatToNumber(currency: string): number {
        return parseFloat(currency.replace(/[^0-9.-]+/g, ''));
      }

      //Replaces a char for another
      replace(text: string, char: string, newchar: string): string {
        while (text.indexOf(char) > -1) {
          text = text.replace(char, newchar);
        }
        return text;
      }

      concatString(value : any[], separator : string, keyIndex : number) : string{
        let concatedString : string = "";
        let keys = Object.keys(value[0]).length;
        if(keyIndex>keys){
          concatedString = "Key out of range. maxKeyValue:" + keys;
          return concatedString;
        }
        if (keyIndex >= 0 && keyIndex < value.length) {
          concatedString = value.map(item => item[Object.keys(item)[keyIndex]]).join(separator);
        } else {
          concatedString = ''; // out of range
          return "";
        }
        return concatedString ;
      }

      
      
   isValidEmail(email) : boolean{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
   }   

   /*===================================================================================================
     ===============================GENERATES A FILE INTO DOWNLOADS======================================
     ===================================================================================================*/
  //Axel Aguilar A. 11/09/2023
   saveFileAS(archivo: string, filename: string, ext : number) {
    //0 = PDF, 1 = TXT, 2 = XML
    const contentType = ext === 0 ? 'application/pdf' : ext === 2 ? 'text/xml' : 'text/plain';

    var blob = this.base64toBlob(archivo, contentType);
    let a = document.createElement("a");
    document.body.appendChild(a);
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = String(filename);
    a.click();
    window.URL.revokeObjectURL(filename);
    a.remove();
  }
  private base64toBlob(b64Data: string, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays : any[]= [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
   /**/

  //23/09/2023
  swalFire(title : string, message : string, icon : number, okButton : boolean = true, cancelButton: boolean = false, textOk? : string, textCancel? : string){
    swal.fire({
      icon : icon === 0 ? 'success' : icon === 2 ? 'info' : icon === 1? 'error' : icon === 3 ? 'question' : 'warning',
      title : title,
      html : message,
      showCancelButton : cancelButton,
      showConfirmButton : okButton,
      
    });
  }
   private SYMBOLS:{
    literal : ``
   }
}
