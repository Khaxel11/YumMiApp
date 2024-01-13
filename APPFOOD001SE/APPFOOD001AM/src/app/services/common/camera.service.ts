import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { rejects } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  photos : string = "";//[] = []; 
  constructor() { }

  async takePicture(): Promise<any> {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  
    if (photo.webPath) {
      const uri = photo.webPath;
      const base64Image = await this.convertUriToBase64(uri);
      return { uri, base64Image };
    }
  }
  
  async convertUriToBase64(uri: string): Promise<string> {
    // Realizar una petición para obtener el blob de la imagen
    const response = await fetch(uri);
    const blob = await response.blob();
  
    // Convertir el blob a base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async openGallery() : Promise<any>{
    const galleryPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });
    if (galleryPhoto.webPath) {
      const uri = galleryPhoto.webPath;
      const base64Image = await this.convertUriToBase64(uri);
      return { uri, base64Image };
    }
  }
}
