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
  
  caseDescription: string = ''; // Variável para armazenar a descrição do caso
  response: string = ''; // Variável para armazenar a resposta da IA
  isThinking: boolean = false; // Variável para controlar o estado de "Pensando..."

  constructor(
    private route: ActivatedRoute,
    private serviceUService: ServiceUService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      try {
        // Busca os dados do usuário usando o serviço
        this.serviceUService.DadosUsers(userId).subscribe({
          next: (data: Usuario) => {
            this.user = data; // Armazena os dados do usuário
          },
          error: (err) => {
            console.error(err);
          }
        });
        // Caso o usuário não seja encontrado, um mediador será buscado
        this.serviceUService.DadosMediador(userId).subscribe({
          next: (data: Mediador) => {
            this.user = data;
          },
          error: (err) => {
            console.log('Erro ao carregar dados');
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Função para simular a resposta da IA com base na descrição do caso
  getCaseEstimate() {
    if (!this.caseDescription.trim()) {
      this.response = 'Por favor, descreva seu caso para que eu possa fazer uma estimativa.';
      return;
    }

    // Simula um delay de carregamento
    this.isThinking = true;  // Ativa o estado "Pensando..."

    // Após um tempo (simulando processamento), gera a resposta
    setTimeout(() => {
      const keywords = ['roubo', 'fraude', 'herança', 'acidente', 'contrato'];
      let score = 0;

      // Simula um cálculo simples baseado em palavras-chave encontradas na descrição
      for (let keyword of keywords) {
        if (this.caseDescription.toLowerCase().includes(keyword)) {
          score++;
        }
      }

      // Gera uma resposta baseada na pontuação (simulação simples)
      if (score >= 3) {
        this.response = 'Parece que você tem um bom caso jurídico! A probabilidade de vitória é alta.';
      } else if (score > 0) {
        this.response = 'Você pode ter uma chance, mas seria bom procurar um especialista para mais detalhes.';
      } else {
        this.response = 'Infelizmente, sua descrição não parece indicar um caso forte. É importante consultar um advogado para uma análise detalhada.';
      }

      this.isThinking = false;  // Desativa o estado "Pensando..."
    }, 2000); // 2000ms = 2 segundos de delay
  }
}
