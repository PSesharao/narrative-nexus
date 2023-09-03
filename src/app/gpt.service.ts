// gpt.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'; // Import the environment

@Injectable({
  providedIn: 'root'
})
export class GptService {
  constructor(private httpClient: HttpClient) {}

  private messages = [{ role: 'system', content: 'You are a helpful assistant.' }] ; 

  askGPT(message : any ) {
    const url = environment.apiUrl; // Use the apiUrl from the environment
    const httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${environment.apiKey}`); // Use the apiKey from the environment
    this.messages.push(message)
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: this.messages
    };

    return this.httpClient.post(url, payload, { headers: httpHeaders });
  }
}
