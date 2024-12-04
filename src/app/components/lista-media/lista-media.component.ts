
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mediador, Mensagem, Usuario } from '../../models/modelos.model';

@Component({
  selector: 'app-lista-media',
  templateUrl: './lista-media.component.html',
  styleUrl: './lista-media.component.css'
})
export class ListaMediaComponent {
  Mediador : Mediador[] | null = [];
  Usuario : Usuario[] | null = [];

  User : Mediador | Usuario | null = null;
  EnviarMensagem:boolean = false
  Selecionado:boolean = false

  inputpesq:string=""
  pesquisa:string=""

  enviarMen = {
    remetente: '',
    destinatario: '',
    conteudo: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: ServiceUService
  ) {}

  ngOnInit(){
    //Get Para os Mediadores
    this.service.PegarTodosMediadores().subscribe({
      next:(data)=>{
        this.Mediador = data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.service.PegarTodosUsuarios().subscribe({
      next:(data)=>{
        this.Usuario = data;
      },
      error:(err)=>{
        console.log(err)
      }
    })

    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      try{
        // Busca os dados do usuário usando o serviço
        this.service.DadosUsers(userId).subscribe({
          next: (data: Usuario) => {
            this.User = data; // Armazena os dados do usuário
            this.enviarMen.remetente = data.id
          },
          error: (err) => {
            console.error(err);
          }
        });
        //Caso o Usuario não for encontrado, um Usuario do tipo Mediador Será Buscado
        this.service.DadosMediador(userId).subscribe({
          next:(data:Mediador)=>{
            this.User = data;
            this.enviarMen.remetente = data.id
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

  Pesquisar(){
    if(this.inputpesq){
      this.pesquisa=this.inputpesq
    }else{
      this.pesquisa=''
    }
  }

  MediadorSelecionado(id:string){
    this.enviarMen.destinatario = id
  }
  abrirCaixaEnviar(){
    this.Selecionado = !this.Selecionado
  }
  enviarMensagemPrimeirVez(){
    if(this.enviarMen.conteudo){
      this.service.enviarMensagem(this.enviarMen).subscribe({
        next:(data)=>{
          alert('Mensagem Enviada, Cheque suas mensagens')
          console.log(data)
        },
        error:(err)=>{
          alert('Erro ao enviar Mensagem')
          console.log(err)
        }
      })
    }else{
      alert('Sua Mensagem não Pode Ser Vazia')
    }
  }
}
