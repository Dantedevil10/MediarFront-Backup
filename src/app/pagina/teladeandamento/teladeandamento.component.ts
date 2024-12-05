import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';  // Importando o serviço
import { Mediador, Processo, Usuario } from '../../models/modelos.model'; // Importe a interface Processo

@Component({
  selector: 'app-teladeandamento',
  templateUrl: './teladeandamento.component.html',
  styleUrls: ['./teladeandamento.component.css']
})
export class TeladeandamentoComponent implements AfterViewInit {
  @ViewChild('teste') teste!: ElementRef;

  user: Usuario | Mediador | null = null;

  processo: Processo | null = null;  // Tipagem usando a interface Processo
  aberto: boolean = false;
  analise: boolean = false;
  fechado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Captura o ID do processo na URL
    const processoId = this.route.snapshot.paramMap.get('id');

    if (processoId) {
      // Busca os dados do processo com base no ID
      this.serviceUService.getProcessoById(processoId).subscribe({
        next: (data: Processo) => {
          this.processo = data; // Armazena os dados do processo
          this.atualizaStatus();
        },
        error: (err) => {
          console.error(err);
          // Tratar erro, por exemplo, exibir mensagem de erro
        }
      });
    }

    const userId = this.route.snapshot.paramMap.get('UId');

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
            console.log('Erro ao Carregar Dados' + err)
          }
        })

      }catch(err){
        console.log(err)
      }
    }
  }

  ngAfterViewInit() {
    this.atualizaStatus();
  }

  // Atualiza o status do progresso com base nas condições
  atualizaStatus() {
    if (this.processo) {
      switch (this.processo.status) {
        case 'ABERTO':
          this.aberto = true;
          this.analise = false;
          this.fechado = false;
          break;
        case 'EM_ANALISE':
          this.aberto = false;
          this.analise = true;
          this.fechado = false;
          break;
        case 'FINALIZADO':
          this.aberto = false;
          this.analise = false;
          this.fechado = true;
          break;
        default:
          this.aberto = false;
          this.analise = false;
          this.fechado = false;
      }

      // Atualiza a largura da barra de progresso
      this.renderer.setStyle(this.teste.nativeElement, 'width', this.getProgressWidth());
    }
  }

  // Retorna a largura da barra de progresso com base no status do processo
  getProgressWidth(): string {
    if (this.aberto) return '14%';
    if (this.analise) return '40%';
    if (this.fechado) return '80%';
    return '0%';
  }
}
