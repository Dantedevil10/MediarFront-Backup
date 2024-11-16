import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';

@Component({
  selector: 'app-dadosdaconta',
  templateUrl: './dadosdaconta.component.html',
  styleUrl: './dadosdaconta.component.css'
})
export class DadosdacontaComponent {
  user: any; // Para armazenar os dados do usuário
  errorMessage: string | null = null; // Para armazenar mensagens de erro, se necessário

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService
  ) {}

  ngOnInit(){
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      // Busca os dados do usuário usando o serviço
      this.serviceUService.DadosUsers(userId).subscribe({
        next: (data) => {
          this.user = data; // Armazena os dados do usuário
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erro ao carregar dados do usuário'; // Define mensagem de erro
        }
      });
    }
  }

   // Função para formatar o CPF
   formatarCpf(cpf: string): string {
    if (!cpf || cpf.length !== 11) {
      return 'CPF inválido';
    }

    // Retorna os 3 primeiros números, os 2 últimos, e mascara o resto
    const primeiros = cpf.substring(0, 3);
    const ultimos = cpf.substring(cpf.length - 2);
    return `${primeiros} . *** . *** - ${ultimos}`;
  }
}
