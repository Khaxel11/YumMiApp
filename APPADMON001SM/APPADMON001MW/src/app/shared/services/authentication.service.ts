import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly SESSION_KEY = 'user_session';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  login(username :string , password : string) {
    // Tu lógica de inicio de sesión
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ username }));
    this.isLoggedInSubject.next(true);
  }
  logout() {
    // Eliminar la sesión del almacenamiento local al cerrar sesión
    localStorage.removeItem(this.SESSION_KEY);
  }

  isAuthenticated(): boolean {
    // Verificar si hay una sesión válida en el almacenamiento local
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  getUser(): any {
    // Obtener los datos del usuario desde el almacenamiento local
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }
}
