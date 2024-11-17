// Modelo para Mediador
export interface Mediador {
  id: string; // UUID como string
  contatos: Contato[];
  senha: string;
  cpf: string;
  email: string;
  nomeUsuario: string;
  tribunalAtuacao: TribunalAtuacao;
  cidadeAtuacao: string;
  titulacaoGraduacao: string;
  tipoDeConta: string; // Sempre "MEDIADOR"
  processosRecebidos: Processo[];
  mensagensEnviadas: Mensagem[];
  mensagensRecebidas: Mensagem[];
}
export interface MediadorCri{
  senha: string;
  cpf: string;
  email: string;
  nomeUsuario: string;
  tribunalAtuacao: string;
  cidadeAtuacao: string;
  titulacaoGraduacao: string;
}

// Modelo para Usuário
export interface Usuario {
  id: string; // UUID como string
  contatos: Contato[];
  email: string;
  cpf: string;
  senha: string;
  nomeUsuario: string;
  tipoDeConta: string; // Sempre "USUARIO"
  processosAbertos: Processo[];
  mensagensEnviadas: Mensagem[];
  mensagensRecebidas: Mensagem[];
}
export interface UsuarioCri{
  email: string;
  cpf: string;
  senha: string;
  nomeUsuario: string;
}


// Modelo para Processo
export interface Processo {
  id: string; // UUID como string
  criador: Usuario;
  mediadorEscolhido?: Mediador; // Opcional, pois pode ser null
  status: StatusProcesso;
  nomeAutor: string;
  nomeReu: string;
  cpfAutor: string;
  dadosAcusado: string;
  descricaoAcusacao: string;
  comprovanteResidencia?: string; // Opcional, pode ser null
  urgencia: boolean;
  dataEmissao: Date;
  emailAutor: string;
  motivoEncerramento?: string; // Opcional, pode ser null
}

export interface ProcessoCri{
  criadorId: string; // ID do criador (não o objeto completo)
  nomeAutor: string;
  nomeReu: string;
  cpfAutor: string;
  dadosAcusado: string;
  descricaoAcusacao: string;
  comprovanteResidencia?: string; // Opcional, pode ser nulo
  urgencia: boolean;
  emailAutor: string;
}

// Modelo para Mensagem
export interface Mensagem {
  id: number;
  remetente: ParticipanteBase;
  destinatario: ParticipanteBase;
  conteudo: string;
  dataEnvio: Date;
}

// Modelo para Contato
export interface Contato {
  id: number;
  usuario: ParticipanteBase;
  contato: ParticipanteBase;
}

// Modelo para ParticipanteBase (pode ser Mediador ou Usuário)
export interface ParticipanteBase {
  id: string; // UUID como string
  nomeUsuario: string;
  email: string;
  cpf: string;
}

// Enum para TribunalAtuacao
export enum TribunalAtuacao {
  TODOS = 'TODOS',
  ESTADUAL = 'ESTADUAL',
  FEDERAL = 'FEDERAL'
}

// Enum para StatusProcesso
export enum StatusProcesso {
  EM_ANALISE = 'EM_ANALISE',
  ABERTO = 'ABERTO',
  FINALIZADO = 'FINALIZADO',
  ENCERRADO = 'ENCERRADO'
}
