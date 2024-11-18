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
  errorMessage: string | null = null;

  mensagens: Mensagem[] = [];  // Utilizando a interface Mensagem

  enviarMen = {
    remetente: '',
    destinatario: '',
    conteudo: ''
  }

  contatoSelecionado: string = "";
  IdContatoSelecionado:any;
  MeuId:any;
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
            this.MeuId = data.id
            this.enviarMen.remetente = data.id
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
            this.MeuId = data.id
            this.enviarMen.remetente = data.id
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

  prgarMensagens(){
    this.serviceUService.getMensagens(this.MeuId,this.IdContatoSelecionado).subscribe({
      next:(data)=>{
        this.mensagens = data;
        // console.log(data)
        // console.log('Algo aconteceu')
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  enviarMensagem(){
    if(this.enviarMen.conteudo){
      this.serviceUService.enviarMensagem(this.enviarMen).subscribe({
        next:(data)=>{
          console.log('Mensagem Enviada')
          this.enviarMen.conteudo = '';
          this.prgarMensagens();
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }

  contatoSelect(contatoSelecionado:any, id:any) {
    this.contatoSelecionado = contatoSelecionado;
    this.selecionado = contatoSelecionado !== "";
    this.IdContatoSelecionado = id
    this.enviarMen.destinatario = id

    return this.prgarMensagens()
  }
}
