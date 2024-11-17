import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mediador, Usuario } from './../../models/modelos.model'; // Importe a interface de usuário

@Component({
  selector: 'app-home-log',
  templateUrl: './home-log.component.html',
  styleUrls: ['./home-log.component.css'] // Corrigido: styleUrl -> styleUrls
})
export class HomeLogComponent {

  user: Usuario | Mediador | null = null; // Armazena os dados do usuário com tipagem correta
  errorMessage: string | null = null; // Para armazenar mensagens de erro, se necessário
  trigger:boolean = false;
  numeroProcesso: string = '';  // Variável para armazenar o número do processo

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService,
    private router: Router
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
            alert('Erro ao Carregar Dados')
          }
        })
      }catch(err){
        console.log(err)
      }
    }
  }

  abrirCaixaProcesso() {
    this.trigger = !this.trigger;  // Alterna o valor de trigger
  }

  irParaAndamento() {
    if (this.numeroProcesso) {
      this.router.navigate(['/andamento', this.numeroProcesso]);  // Redireciona para a página de andamento com o ID do processo
    } else {
      console.error('Número do processo não informado');
      // Talvez exiba um aviso ou mensagem para o usuário
    }
  }
}
