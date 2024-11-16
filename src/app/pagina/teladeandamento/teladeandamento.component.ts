import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUService } from '../../services/service-u.service';  // Importando o serviço

@Component({
  selector: 'app-teladeandamento',
  templateUrl: './teladeandamento.component.html',
  styleUrls: ['./teladeandamento.component.css']
})
export class TeladeandamentoComponent implements AfterViewInit {
  @ViewChild('teste') teste!: ElementRef;

  processo: any;  // Para armazenar os dados do processo
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
        next: (data) => {
          this.processo = data; // Armazena os dados do processo
          this.atualizaStatus();
        },
        error: (err) => {
          console.error(err);
          // Tratar erro, por exemplo, exibir mensagem de erro
        }
      });
    }
  }

  ngAfterViewInit() {
    this.atualizaStatus();
  }

  // Atualiza o status do progresso com base nas condições
  atualizaStatus() {
    if (this.processo) {
      if (this.processo.status === 'ABERTO') {
        this.aberto = true;
        this.analise = false;
        this.fechado = false;
      } else if (this.processo.status === 'EM_ANALISE') {
        this.aberto = false;
        this.analise = true;
        this.fechado = false;
      } else if (this.processo.status === 'FINALIZADO') {
        this.aberto = false;
        this.analise = false;
        this.fechado = true;
      }

      // Atualiza a largura da barra de progresso
      this.renderer.setStyle(this.teste.nativeElement, 'width', this.getProgressWidth());
    }
  }

  getProgressWidth() {
    if (this.aberto) return '14%';
    if (this.analise) return '40%';
    if (this.fechado) return '80%';
    return '0%';
  }
}
