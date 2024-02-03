import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserJwt } from '../models/common/userJwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//import { environment } from '../../../src/environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AuthgenService {

  constructor(private httpClient: HttpClient) { }

  genToken(user: UserJwt): Observable<any> {
    const url = `${environment.APPADMON01MW}auth/Token`;
    return this.httpClient.post(url, user);
  }
}
