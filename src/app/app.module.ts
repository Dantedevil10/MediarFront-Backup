import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DadosdacontaComponent } from './components/dadosdaconta/dadosdaconta.component';
import { HeaderLogComponent } from './components/header-log/header-log.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { TeladecadastroComponent } from './components/teladecadastro/teladecadastro.component';
import { TeladeloginComponent } from './components/teladelogin/teladelogin.component';
import { TelademensagemComponent } from './components/telademensagem/telademensagem.component';
import { AgendamentoComponent } from './pagina/agendamento/agendamento.component';
import { ChatcomiaComponent } from './pagina/chatcomia/chatcomia.component';
import { HistoricoComponent } from './pagina/historico/historico.component';
import { HomeLogComponent } from './pagina/home-log/home-log.component';
import { HomeLogMComponent } from './pagina/home-log-m/home-log-m.component';
import { NotificacaoComponent } from './pagina/notificacao/notificacao.component';
import { SobreNosComponent } from './pagina/sobre-nos/sobre-nos.component';
import { TeladeandamentoComponent } from './pagina/teladeandamento/teladeandamento.component';

@NgModule({
  declarations: [
    AppComponent,
    DadosdacontaComponent,
    HeaderLogComponent,
    HomePrincipalComponent,
    TeladecadastroComponent,
    TeladeloginComponent,
    TelademensagemComponent,
    AgendamentoComponent,
    ChatcomiaComponent,
    HistoricoComponent,
    HomeLogComponent,
    HomeLogMComponent,
    NotificacaoComponent,
    SobreNosComponent,
    TeladeandamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
