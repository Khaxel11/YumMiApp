import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { MensajeRegla } from '../models/mensaje-regla';
import { ReglasCondiciones } from 'src/app/models/common/reglas-condiciones.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioNotificacionReglasService {
    ////////////////////////////////////////////////////////////////////////////
    // DECLARACION DE VARIABLES
    ////////////////////////////////////////////////////////////////////////////
    // var ids:string = [];
    strTitulo: string=""; // = string[];
    strMensaje: string=""; // = string[];
    IdTipoMensaje: number = 0;

    // tblMensajeRegla : Array<MensajeRegla>;  
    tblDataReglasCondiciones: Array<ReglasCondiciones>;  

    URL_INFORMATICA_ZONA = environment.URL_INFORMATICA_INFERPAPI001 + 'ErroresReglaNegocio/';
/*
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
    */

    


    ////////////////////////////////////////////////////////////////////////////

    constructor(private http: HttpClient) { }

    getMensajeGeneral(parTitulo, parMensaje, parTipoMensaje)
    {
      this.strTitulo = parTitulo ; //"Regla " + "" + result.erpdaT004_IdRegla;
      this.strMensaje = parMensaje ; //result.erpdaT005_MensajeAdvertencia;
      this.IdTipoMensaje = parTipoMensaje  ; //result.erpdaT005_IdTipoMensaje;
      this.DisplayAlerta(this.IdTipoMensaje);
    }

    ////////////////////////////////////////////////////////////////////////////
    //#region Metodos Funcionalidad
    ////////////////////////////////////////////////////////////////////////////
    DisplayAlerta(parTipo){
      //AlertIcon: SweetAlertIcon.


      const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', swal.stopTimer)
          toast.addEventListener('mouseleave', swal.resumeTimer)
        }
      })


        if (parTipo == 1) // success
        {
          swal.fire(
            this.strTitulo,
            this.strMensaje ,
            'success'
          );
        } 
        else if (parTipo == 2) // error
        {
          swal.fire(
            this.strTitulo,
            this.strMensaje ,
            'error'
          );
        }
        else if (parTipo == 3) //warning 
        {
          swal.fire(
            this.strTitulo,
            this.strMensaje ,
            'warning'
          );
        }

        else if (parTipo == 4) //info 
        {
          swal.fire(
            this.strTitulo,
            this.strMensaje ,
            'info'
          );
        }

        else if (parTipo == 5) //question 
        {
          swal.fire(
            this.strTitulo,
            this.strMensaje ,
            'question'
          );
        }

        else if (parTipo == 6) //Mensaje Configurado 
        {
          swal.fire({
            title: '<strong>' + this.strTitulo + '</strong>',
            icon: 'info',
            html:
            this.strMensaje + ', <br/>' +
              ' Para mas informacion de la regla, <a href="http://datosnv2008.cecso.com.mx/ReportServer/Pages/ReportViewer.aspx?%2fFacturacion2020%2fFCOSRS004&rs:Command=Render">Ver Detalle</a> ' +
              '',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            //confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            //confirmButtonAriaLabel: 'Thumbs up, great!',
            //cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
          })
        }

        else if (parTipo == 7) //Toaster 
        {
          Toast.fire({
            icon: 'success',
            title: this.strMensaje //'Signed in successfully'
          })
        }



    }

    ////////////////////////////////////////////////////////////////////////////
    //#region Metodos Funcionalidad
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////
    //#region Metodos de Consultas a BD
    ////////////////////////////////////////////////////////////////////////////

    /// Metodo de consulta obtener Encabezado
    /// GET: api/ErroresReglaNegocio/GetErrorEncabezado
    getErrorEncabezado()
    {
      return this.http.get(this.URL_INFORMATICA_ZONA + 'GetErrorEncabezado');
    }

    // /// Metodo de consulta obtener Encabezado
    // /// GET: api/ErroresReglaNegocio/GetErrorDetalle
    // getMensajeErrorRegla(parIdRegla: Number)
    // {
    //   const urlApiReglas =`${this.URL_INFORMATICA_ZONA}GetErrorDetalle?parIdRegla=${parIdRegla}`;

    //   this.http.get(urlApiReglas).subscribe(
    //     (data: Array<MensajeRegla>) => {
    //         this.tblMensajeRegla = data; 
           
    //         for(let result of this.tblMensajeRegla){
    //           this.strTitulo="Regla " + "" + result.erpdaT004_IdRegla;
    //           this.strMensaje=result.erpdaT005_MensajeAdvertencia;
    //           this.IdTipoMensaje=result.erpdaT005_IdTipoMensaje;
    //           this.DisplayAlerta(this.IdTipoMensaje);
    //         }

    //     },
    //     (error) => {
    //       swal.fire(
    //         'Ocurrio un Error',
    //         'Ocurrio un error al cargar la informacion de Reglas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
    //         'error'
    //       );
    //     }
    //     //error => console.log(error),
    //     //() => console.log('Done')
    //     );
    // }

    /// Metodo de consulta obtener Detalle
    /// GET: api/ErroresReglaNegocio/GetReglasCondiciones
    getReglasCondiciones(parOpc: number, parIdReglaCon: Number, parModulo: string = '', parMensajeAd: string = '')
    {
      const urlApiReglas = `${this.URL_INFORMATICA_ZONA}GetReglasCondiciones?parOpc=${parOpc}&parIdReglaCon=${parIdReglaCon}&parModulo=${parModulo}&parMensajeAd=${parMensajeAd}`;
      
      this.http.get(urlApiReglas).subscribe(
        (data: Array<ReglasCondiciones>) => {
            // Guardar tabla en almacenamiento
            sessionStorage.setItem("ReglasCondiciones", JSON.stringify(data));
        },
        (error) => {
          swal.fire(
            'Ocurrio un Error',
            'Ocurrio un error al cargar la informacion de Reglas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
            'error'
          );
        }
        //error => console.log(error),
        //() => console.log('Done')
        );
    }

    getMensajeReglaCondicion(parIdRegla: number, parIdCondicion: number, parModulo: string = "", parMensajeAd: string = ""){
      const dataSaved = JSON.parse(sessionStorage.getItem("ReglasCondiciones"));

      for (let index = 0; index < dataSaved.length; index++) {
        const element = dataSaved[index];
        if (parModulo !== "") {
          if (element.idRegla === parIdRegla && element.idCondicion === parIdCondicion && element.nomenclatura === parModulo) {
            this.strTitulo = "Regla " + "" + element.idRegla;
            this.strMensaje = element.mensajeInformativo + (parMensajeAd !== "" ? " " + parMensajeAd: "");
            this.IdTipoMensaje = element.idTipoMensaje;
            this.DisplayAlerta(this.IdTipoMensaje);
          }
        }
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    //#region Metodos de Consultas a BD
    ////////////////////////////////////////////////////////////////////////////

}
