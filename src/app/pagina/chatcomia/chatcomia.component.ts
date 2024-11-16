import { Component } from '@angular/core';

@Component({
  selector: 'app-chatcomia',
  templateUrl: './chatcomia.component.html',
  styleUrls: ['./chatcomia.component.css']
})
export class ChatcomiaComponent {
  caseDescription: string = '';  // Para armazenar a descrição do caso
  loading: boolean = false;  // Indicador de carregamento
  responseMessage: string = '';  // Para armazenar a resposta da IA

  BASE_URL: string = "https://api.openai.com/v1/chat/completions";
  API_KEY: string = "";  // Coloque sua chave da API aqui
  


}
