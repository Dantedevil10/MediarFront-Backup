import { Mediador, MediadorCri, Mensagem, MensagemEnv, Processo, ProcessoCri, Usuario, UsuarioCri } from './../models/modelos.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceUService {

  //http://localhost:8080

  private defaultGateway = 'https://backmediartestes-production.up.railway.app/userCom/';
  private defaultMediador = 'https://backmediartestes-production.up.railway.app/userMedi/'
  private processosGateway = 'https://backmediartestes-production.up.railway.app/processos/';

  private mensagensGateway = 'https://backmediartestes-production.up.railway.app/mensagens';
  private enviarmensagem = 'https://backmediartestes-production.up.railway.app/mensagens/enviar'

  private processosUrl = 'https://backmediartestes-production.up.railway.app/processos/criarProcesso';

  private criarUser = 'https://backmediartestes-production.up.railway.app/userCom/criarUsuario';
  private criarmediador = 'https://backmediartestes-production.up.railway.app//userMedi/criarMedi';

  private editarUser = 'https://backmediartestes-production.up.railway.app/userCom/editar'
  private editarmediador = 'https://backmediartestes-production.up.railway.app/userMedi/editarMedi'

  /////////////////////////////////////////////////////////////////////////////// teste Login
  private apiUrl = 'https://backmediartestes-production.up.railway.app/auth/login';
  ///////////////////////////////////////////////////////////////////////////////

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { cpf, senha });
  }
  getMensagens(usuarioId: string, contatoId: string): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(`https://backmediartestes-production.up.railway.app/mensagens/conversa/${usuarioId}/${contatoId}`);
  }




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

  criarUsuario(usuario:UsuarioCri): Observable<UsuarioCri>{
    return this.http.post<UsuarioCri>(this.criarUser,usuario);
  }

  editarUsuario(usuario:UsuarioCri,id:any): Observable<UsuarioCri>{
    return this.http.put<UsuarioCri>(`${this.editarUser}/${id}`,usuario)
  }

  criarMediador(mediador:MediadorCri): Observable<MediadorCri>{
    return this.http.post<MediadorCri>(this.criarmediador,mediador);
  }

  editarMediador(mediador:MediadorCri,id:any): Observable<MediadorCri>{
    return this.http.put<MediadorCri>(`${this.editarmediador}/${id}`,mediador)
  }

  enviarMensagem(mensagem:MensagemEnv):Observable<MensagemEnv>{
    return this.http.post<MensagemEnv>(this.enviarmensagem,mensagem)
  }
}
