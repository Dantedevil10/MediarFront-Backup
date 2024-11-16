import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mensagem, Usuario } from '../../models/modelos.model';


@Component({
  selector: 'app-telademensagem',
  templateUrl: './telademensagem.component.html',
  styleUrls: ['./telademensagem.component.css']  // Corrigido para 'styleUrls'
})
export class TelademensagemComponent {
  user: Usuario | null = null; // Utilizando a interface Usuario
  mensagens: Mensagem[] = [];  // Utilizando a interface Mensagem
  errorMessage: string | null = null;

  contatoSelecionado: string = "";
  selecionado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id'); // Pega o ID da URL

    if (userId) {
      // Passa o ID da rota para o serviço
      this.serviceUService.DadosUsers(userId).subscribe({
        next: (data: Usuario) => {
          this.user = data; // Armazena os dados do usuário usando a interface Usuario
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erro ao carregar dados do usuário'; // Define mensagem de erro
        }
      });
    }

    this.serviceUService.DadosMensagens().subscribe({
      next: (data: Mensagem[]) => {
        this.mensagens = data; // Armazena os dados das mensagens usando a interface Mensagem
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erro ao carregar mensagens'; // Define mensagem de erro
      }
    });
  }

  contatoSelect(contatoSelecionado: string) {
    this.contatoSelecionado = contatoSelecionado;
    this.selecionado = contatoSelecionado !== "";

    return this.contatoSelecionado;
  }
}
