import { ToastController } from "@ionic/angular";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController } from "@ionic/angular";
export class General {
    
    private toastController = new ToastController();
    private sanitizer: DomSanitizer
    private Image : File;
    constructor() {}
    public colors: { [index: number]: string } = {
        0: 'black',
        1: 'darkblue',
        2: 'green',
      };
    async showMessage(
        message: string,
        color: string,
        textButton: string = "",
        position: string = 'bottom',
        duration: number = 2000,
        functionHand?: any
    ) {
        const currentToast = await this.toastController.getTop();

        if (currentToast) {
            await currentToast.dismiss();
        }

        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: position === 'bottom' ? 'bottom' : 'top',
            color: color,
            buttons: [
                {
                    text: textButton,
                    role: 'cancel',
                    handler: () => {
                        if (functionHand) {
                            functionHand();
                        }
                    }
                }
            ]
        });

        toast.present();
    }

    getImageURL() {
        var imageURL : string = "";
        try {
          let reader = new FileReader();
          reader.onload = (event: any) => {
            imageURL = event.target.result;
          };
          reader.readAsDataURL(this.Image);
          
        } catch (error) {
          
        }
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

    showImage(event: any) : any{
    
        try {
          this.Image = event.target.files[0];
          this.getImageURL();
  
          let file: File = event.target.files[0];
  
          let reader = new FileReader();
          reader.onload =  (e: any) => {
            let base64String = e.target.result.split(',')[1]; 
            return base64String;
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.log(error);
        }
     
  
     
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
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }     
 
}
export class MESSAGE{
   ERROR : string = "Error, intentelo de nuevo o revise su conexión a internet, si el problema persiste comuniquese con el equipo de soporte";
   LOG_ERROR : string = "Usuario o contraseña incorrectos";
   NET_ERROR : string = "Revise su conexión a internet e intentelo de nuevo";
   
   BLANK(value : string) : string{
      return "Capture el campo " + value + " para poder continuar";
   }
   AT_LEAST(value : string) : string{
    return "Debe seleccionar al menos " + value + " para poder continuar";
   }
}

