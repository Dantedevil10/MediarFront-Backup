import { Mediador, Mensagem, Processo, ProcessoCri, Usuario } from './../models/modelos.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceUService {

  private defaultGateway = 'http://localhost:8080/userCom/';
  private defaultMediador = 'http://localhost:8080/userMedi/'
  private processosGateway = 'http://localhost:8080/processos/';
  private mensagensGateway = 'http://localhost:8080/mensagens';
  private processosUrl = 'http://localhost:8080/processos/criarProcesso';

  constructor(private http: HttpClient) {}

  // Método para obter dados de um usuário por ID, agora tipado com a interface 'Usuario'
  DadosUsers(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.defaultGateway}${id}`);
  }
  DadosMediador(id: string): Observable<Mediador> {
    return this.http.get<Mediador>(`${this.defaultMediador}${id}`);
  }

  // Método para obter todas as mensagens, agora tipado com uma lista de 'Mensagem'
  DadosMensagens(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(this.mensagensGateway);
  }

  // Método para obter os dados do processo por ID, agora tipado com a interface 'Processo'
  getProcessoById(id: string): Observable<Processo> {
    return this.http.get<Processo>(`${this.processosGateway}${id}`);
  }

  // Método para criar um novo processo
  criarProcesso(processo: ProcessoCri): Observable<ProcessoCri> {
    return this.http.post<ProcessoCri>(this.processosUrl, processo);  // Envia um POST para criar o processo
  }
}
