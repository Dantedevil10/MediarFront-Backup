import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mediador, Mensagem, Usuario } from '../../models/modelos.model';


@Component({
  selector: 'app-telademensagem',
  templateUrl: './telademensagem.component.html',
  styleUrls: ['./telademensagem.component.css']  // Corrigido para 'styleUrls'
})
export class TelademensagemComponent {
  user: Usuario | Mediador | null = null; // Utilizando a interface Usuario
  mensagens: Mensagem[] = [];  // Utilizando a interface Mensagem
  errorMessage: string | null = null;

  contatoSelecionado: string = "";
  selecionado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      try{
        // Busca os dados do usuário usando o serviço
        this.serviceUService.DadosUsers(userId).subscribe({
          next: (data: Usuario) => {
            this.user = data; // Armazena os dados do usuário
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Erro ao carregar dados do usuário'; // Define mensagem de erro
          }
        });
        //Caso o Usuario não for encontrado, um Usuario do tipo Mediador Será Buscado
        this.serviceUService.DadosMediador(userId).subscribe({
          next:(data:Mediador)=>{
            this.user = data;
          },
          error:(err)=>{
            console.log('Erro ao Carregar Dados' + err)
          }
        })
      }catch(err){
        console.log(err)
      }
    }
  }

  contatoSelect(contatoSelecionado: string) {
    this.contatoSelecionado = contatoSelecionado;
    this.selecionado = contatoSelecionado !== "";

    return this.contatoSelecionado;
  }
}
