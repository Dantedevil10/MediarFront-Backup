import { Component } from '@angular/core';
import { Mediador, Usuario } from '../../models/modelos.model';
import { ServiceUService } from '../../services/service-u.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatcomia',
  templateUrl: './chatcomia.component.html',
  styleUrls: ['./chatcomia.component.css']
})
export class ChatcomiaComponent {
  user: Usuario | Mediador | null = null;

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

          }
        });
        //Caso o Usuario não for encontrado, um Usuario do tipo Mediador Será Buscado
        this.serviceUService.DadosMediador(userId).subscribe({
          next:(data:Mediador)=>{
            this.user = data;

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


}
