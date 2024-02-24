import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';
import { General } from '../../helpers/general'
const URL = environment.APPADMON01MW + 'Admon/';

import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly SESSION_KEY = 'IdUsuario';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  general = new General();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(public http: HttpClient, private route : Router) { }
 
  async login(username : string, password : string) : Promise<boolean>{
   
    try {
      const hashedPassword = sha256(password);
      const url = URL + 'login';
      const params = new HttpParams()
      .append('NombreUsuario', String(username))
      .append('Password', String(hashedPassword))
      let data : any = await this.http.get(url, { params }).toPromise();
      if(data.data){
        //localStorage.setItem(this.SESSION_KEY, JSON.stringify({ username }));
        //this.isLoggedInSubject.next(true);
        //this.route.navigateByUrl("/");
        this.general.showMessage("Inicio de sesión correcto", 0);
        return true;
        
      }else{
        this.general.showMessage("Usuario o contaseña incorrectos", 3);
        this.isLoggedInSubject.next(false);
        return false;
      }
    } catch (error) {
      this.general.showMessage("Error de conexión", 3);
      return false;
    }
    return;
    
  }
  async isSuccesfullyLoged(){
    this.isLoggedInSubject.next(true);
    this.route.navigateByUrl("/");
    this.general.showMessage("Inicio de sesión correcto", 0);
  }


  logout() {
    // Eliminar la sesión del almacenamiento local al cerrar sesión
    localStorage.removeItem(this.SESSION_KEY);
  }

  isAuthenticated(): boolean {
    // Verificar si hay una sesión válida en el almacenamiento local
    return !!localStorage.getItem(this.SESSION_KEY) && !!localStorage.getItem('token');
  }

  getUser(): any {
    // Obtener los datos del usuario desde el almacenamiento local
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  private getToken(){
    const token = localStorage.getItem('token');
    return 'Bearer ' + token  
  }
  public genToken(entity : any):Observable<any>{
    return this.http.post(environment.APPADMON01MW + 'Auth/Token', entity);
  }

}
