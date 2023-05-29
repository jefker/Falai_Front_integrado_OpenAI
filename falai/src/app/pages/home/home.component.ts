import { Component } from '@angular/core';
import { Usuario } from 'src/app/core/interface/usuario';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  usuario = {} as Usuario;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  entrar() {
    this.loginService.autenticarLogin(this.usuario);
  }

}
