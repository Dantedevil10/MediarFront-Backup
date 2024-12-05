import { NgModule,Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeladecadastroComponent } from './components/teladecadastro/teladecadastro.component';
import { AgendamentoComponent } from './pagina/agendamento/agendamento.component';
import { TeladeloginComponent } from './components/teladelogin/teladelogin.component';
import { SobreNosComponent } from './pagina/sobre-nos/sobre-nos.component';
import { TeladeandamentoComponent } from './pagina/teladeandamento/teladeandamento.component';
import { HomeLogComponent } from './pagina/home-log/home-log.component';
import { NotificacaoComponent } from './pagina/notificacao/notificacao.component';
import { HistoricoComponent } from './pagina/historico/historico.component';
import { DadosdacontaComponent } from './components/dadosdaconta/dadosdaconta.component';
import { ChatcomiaComponent } from './pagina/chatcomia/chatcomia.component';
import { TelademensagemComponent } from './components/telademensagem/telademensagem.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { ListaMediaComponent } from './components/lista-media/lista-media.component';


const routes: Routes = [
  { path: 'cadastro', component: TeladecadastroComponent},
  { path: 'agendar/:id', component: AgendamentoComponent},
  { path: 'login', component: TeladeloginComponent},
  { path: 'sobre-nos', component: SobreNosComponent},
  { path: 'andamento/:id/:UId', component: TeladeandamentoComponent},
  { path: 'home-log/:id', component: HomeLogComponent},
  { path: 'noti', component: NotificacaoComponent},
  { path: 'historico/:id', component: HistoricoComponent},
  { path: 'dadosdaconta/:id', component: DadosdacontaComponent},
  { path: 'chatIa/:id', component: ChatcomiaComponent},
  { path: 'lista/:id', component: ListaMediaComponent},
  { path: 'mensagens/:id', component: TelademensagemComponent}, // Tela-mensagens: parte do chat.
  { path: '**', component: HomePrincipalComponent },// Rota Principal Caso O Caminho Não Seja Encontrado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
