import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mediador, MediadorCri, Usuario, UsuarioCri } from '../../models/modelos.model';

@Component({
  selector: 'app-dadosdaconta',
  templateUrl: './dadosdaconta.component.html',
  styleUrl: './dadosdaconta.component.css'
})
export class DadosdacontaComponent {
  user: Usuario | Mediador | null = null; // Armazena os dados do usuário com tipagem correta
  errorMessage: string | null = null; // Para armazenar mensagens de erro, se necessário

  trigger:boolean = false;
  senhaVelha = '';

  mediador : MediadorCri = {
    senha: '',
    cpf: '',
    email: '',
    nomeUsuario: '',
    tribunalAtuacao: '',
    cidadeAtuacao: '',
    titulacaoGraduacao: '',
  }

  usuario : UsuarioCri = {
    email: '',
    cpf: '',
    senha: '',
    nomeUsuario: ''
  }

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService
  ) {}

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      try{
        // Busca os dados do usuário usando o serviço
        await this.serviceUService.DadosUsers(userId).subscribe({
          next: (data) => {
            this.user = data; // Armazena os dados do usuário
            this.usuario.cpf = data.cpf;
            this.usuario.email = data.email;
            // this.usuario.senha = data.senha;
            this.usuario.nomeUsuario = data.nomeUsuario;
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Erro ao carregar dados do usuário'; // Define mensagem de erro
          }
        });
        //Caso o Usuario não for encontrado, um Usuario do tipo Mediador Será Buscado
        await this.serviceUService.DadosMediador(userId).subscribe({
          next:(data)=>{
            this.user = data;
            this.mediador.cpf = data.cpf;
            this.mediador.email = data.email;
            // this.mediador.senha = data.senha;
            this.mediador.nomeUsuario = data.nomeUsuario;
            this.mediador.tribunalAtuacao = data.tribunalAtuacao;
            this.mediador.cidadeAtuacao = data.cidadeAtuacao;
            this.mediador.titulacaoGraduacao = data.titulacaoGraduacao;
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

  editarUsuario(){
    if(this.user?.senha){
      this.usuario.senha = this.user?.senha
    }

    this.serviceUService.editarUsuario(this.usuario,this.user?.id).subscribe({
      next:(data)=>{
        alert('Dados Atualizado');
      },
      error:(error)=>{
        alert('Erro ao Tentar Salvar Dados')
      }
    })
  }

  editarMediador(){
    if(this.user?.senha){
      this.mediador.senha = this.user?.senha
    }

    this.serviceUService.editarMediador(this.mediador,this.user?.id).subscribe({
      next:(data)=>{
        alert('Dados Atualizado');
      },
      error:(error)=>{
        alert('Erro ao Tentar Salvar Dados')
      }
    })
  }

  editarSenha(){
    if(this.senhaVelha != this.user?.senha){
      alert('Senha Antiga Inválida')
    }else{
      this.serviceUService.editarUsuario(this.usuario,this.user?.id).subscribe({
        next:(data)=>{
          alert('Senha Atualizada');
        },
        error:(error)=>{
          alert('Erro ao Tentar Salvar Dados')
        }
      })
    }
  }

  editarSenhaMediador(){
    if(this.senhaVelha != this.user?.senha){
      alert('Senha Antiga Inválida')
    }else{
      this.serviceUService.editarMediador(this.mediador,this.user?.id).subscribe({
        next:(data)=>{
          alert('Senha Atualizada');
        },
        error:(error)=>{
          alert('Erro ao Tentar Salvar Dados')
        }
      })
    }
  }

}
