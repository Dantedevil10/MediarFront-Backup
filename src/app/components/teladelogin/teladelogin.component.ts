// teladelogin.component.ts
import { ServiceUService } from './../../services/service-u.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teladelogin',
  templateUrl: './teladelogin.component.html',
  styleUrls: ['./teladelogin.component.css']
})
export class TeladeloginComponent {
  cpf: string = '';
  senha: string = '';

  constructor(private authService: ServiceUService, private router: Router) { }

  onLogin() {
    this.authService.login(this.cpf, this.senha).subscribe({
      next: (response) => {
        // Redireciona para a URL home-log com o ID do usuário
        this.router.navigate([`/home-log/${response.id}`]);
      },
      error: (err) => {
        alert('CPF ou senha inválidos');
      }
    });
  }
}
