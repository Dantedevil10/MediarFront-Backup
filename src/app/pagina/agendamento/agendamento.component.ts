import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Usuario, ProcessoCri } from './../../models/modelos.model';
import { Router } from '@angular/router';  // Importe o Router

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  user: Usuario | null = null; // Para armazenar os dados do usuário

  processo: ProcessoCri = {
    criadorId: '', // ID do criador (não o objeto completo)
    nomeAutor: '',
    nomeReu: '',
    cpfAutor: '',
    dadosAcusado: '',
    descricaoAcusacao: '',
    comprovanteResidencia: '',
    urgencia: false,
    emailAutor: ''
  }; // Para armazenar os dados do processo

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.serviceUService.DadosUsers(userId).subscribe({
        next: (data) => {
          this.user = data;
          this.processo.criadorId = data.id; // Preenche o criadorId com o ID do usuário
          this.processo.cpfAutor = data.cpf; // Preenche o CPF do autor automaticamente
          this.processo.emailAutor = data.email; // Preenche o email do autor automaticamente
          this.processo.nomeAutor = data.nomeUsuario;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  enviarProcesso() {
    // Verifica se todos os campos necessários foram preenchidos
    if (this.processo.dadosAcusado && this.processo.nomeReu && this.processo.descricaoAcusacao) {
      this.serviceUService.criarProcesso(this.processo).subscribe({
        next: (data) => {
          console.log('Processo criado com sucesso!', data);

          // Redireciona para a página de histórico do usuário
          if (this.user) {
          this.router.navigate([`/historico/${this.user.id}`]);
          }
        },
        error: (err) => {
          console.error('Erro ao criar processo:', err);
          alert('Erro ao criar processo');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
