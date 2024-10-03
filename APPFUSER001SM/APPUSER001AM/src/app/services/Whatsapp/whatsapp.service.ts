import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageBuilder } from '../../models/MessageBuilder';

const URL = environment.APPWHAAPI001;

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private http: HttpClient) { }

  sendAuthMessage(body: MessageBuilder): any {
    const url = `${URL}send-auth-message`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(url, body, { headers });
  }
}
