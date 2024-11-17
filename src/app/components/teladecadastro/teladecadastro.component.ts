import { ServiceUService } from './../../services/service-u.service';
import { Component } from '@angular/core';
import { Usuario, UsuarioCri } from '../../models/modelos.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teladecadastro',
  templateUrl: './teladecadastro.component.html',
  styleUrl: './teladecadastro.component.css'
})
export class TeladecadastroComponent {

  choosed:boolean = false;
  acountD:string = ''; //Essa Variavel Vai Guardar o valor do tipo de conta
  user: Usuario | null = null; // Para armazenar os dados do usuário

  usuario : UsuarioCri = {
    email: '',
    cpf: '',
    senha: '',
    nomeUsuario: ''
  }

  constructor(private serviceUService:ServiceUService, private router:Router){

  }

  accounttype(acount:string){
    this.acountD = acount.valueOf()
    this.choosed = true
    console.log(this.acountD)
  }
  backtochoose(){
    this.choosed = false
    this.acountD = ''
    console.log(this.acountD)
  }
  criarUsuario(){
    this.serviceUService.criarUsuario(this.usuario).subscribe({
      next:(data)=>{
        alert('Usuario criado com sucesso!' + data);

        // Redireciona para a página de Login do usuário
        this.router.navigate([`/login`]);

      },
      error:(error)=>{
        alert('Erro ao criar processo:'+ error);
      }
    });
  }

}
