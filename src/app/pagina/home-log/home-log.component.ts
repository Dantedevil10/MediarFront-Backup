import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mediador, Usuario } from '../../models/modelos.model'; // Importe a interface de usuário

@Component({
  selector: 'app-home-log',
  templateUrl: './home-log.component.html',
  styleUrls: ['./home-log.component.css'] // Corrigido: styleUrl -> styleUrls
})
export class HomeLogComponent {

  user: Usuario | Mediador | null = null; // Armazena os dados do usuário com tipagem correta
  errorMessage: string | null = null; // Para armazenar mensagens de erro, se necessário

  trigger:boolean = false;
  triggerM:boolean = false ;
  numeroProcesso: string = '';  // Variável para armazenar o número do processo

  carregado:boolean = false;

  mensagem = {
    remetente: '',
    destinatario: '',
    conteudo: ''
  };

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
            this.carregado = true
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
            this.mensagem.remetente = data.id;
            this.carregado = true
          },
          error:(err)=>{
            console.log('Erro ao Carregar Dados')
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
  abrirCaixaEnviar() {
    this.triggerM = !this.triggerM;  // Alterna o valor de trigger
  }

  irParaAndamento() {
    if (this.numeroProcesso) {
      this.router.navigate(['/andamento', this.numeroProcesso]);  // Redireciona para a página de andamento com o ID do processo
    } else {
      console.error('Número do processo não informado');
      // Talvez exiba um aviso ou mensagem para o usuário
    }
  }

  enviarMensagemPrimeirVez(){
    this.serviceUService.enviarMensagem(this.mensagem).subscribe({
      next:(data)=>{
        alert('Mensagem Enviada, Cheque suas mensagens')
        console.log(data)
      },
      error:(err)=>{
        alert('Erro ao enviar Mensagem')
        console.log(err)
      }
    })
  }

}
