import { Component } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent {
  codigoDetectado: string = ''; // Código de barras más común
  mostrarScreenshot: boolean = false; // Mostrar la superposición de la "foto"
  photoURL: string | null = null; // URL de la foto capturada
  finalCode : string = '';
  constructor() {}

  ngOnInit() {
    this.startScanner();
  }

  startScanner() {
    const codigos = {};

    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#barcode-scanner-container'),
        constraints: {
          width: window.innerWidth,
          height: window.innerHeight,
          facingMode: 'environment' // Cambia a 'user' si prefieres la cámara frontal
        }
      },
      decoder: {
        readers: ['ean_reader'] // Puedes configurar otros tipos de códigos de barras aquí
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      console.log('Barcode detected: ', code);
      
      if (codigos[code]) {
        codigos[code]++;
      } else {
        codigos[code] = 1;
      }
      
      const codigosOrdenados = Object.keys(codigos).sort((a, b) => codigos[b] - codigos[a]);
      this.codigoDetectado = codigosOrdenados[0]; // Establecer el código más común
      
      setTimeout(() => {
        this.codigoDetectado = ''; 
      }, 2000); 
    });
  }
  takePicture() {
    
    this.mostrarScreenshot = true;

    
    setTimeout(() => {
      this.mostrarScreenshot = false;
    }, 1000); 
  }
}
