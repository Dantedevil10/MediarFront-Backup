
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';
import { Mediador, Usuario } from '../../models/modelos.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {

  filtroStatus: string = '';
  filtroUrgencia: string = '';
  filtroNomeAutor: string = '';
  filtroCpfAutor: string = '';

  user: Usuario | null = null; // Armazena os dados do usuário com tipagem correta
  media: Mediador | null = null;
  errorMessage: string | null = null; // Para armazenar mensagens de erro, se necessário

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
            this.errorMessage = 'Erro ao carregar dados do usuário'; // Define mensagem de erro
          }
        });
        //Caso o Usuario não for encontrado, um Usuario do tipo Mediador Será Buscado
        this.serviceUService.DadosMediador(userId).subscribe({
          next:(data:Mediador)=>{
            this.media = data;
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
}
