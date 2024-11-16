import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUService {

  private defaultGateway = 'http://localhost:8080/userCom/';  // Remova o uso da variável id aqui
  private processosGateway = 'http://localhost:8080/processos/';

  constructor(private http: HttpClient) {}

  DadosUsers(id: string) {
    return this.http.get(`${this.defaultGateway}${id}`);
  }
  DadosMensagens() {
    return this.http.get(`http://localhost:8080/mensagens`);
  }
  // Método para obter os dados do processo por ID
  getProcessoById(id: string): Observable<any> {
    return this.http.get(`${this.processosGateway}${id}`); // Endpoint para buscar o processo
  }
}
