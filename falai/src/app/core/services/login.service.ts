import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interface/usuario';
import { BehaviorService } from './behavior.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private usuarioAutenticado: boolean = false;

  mostrarHeader = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private behaviorSubject: BehaviorService
  ) { }

  autenticarLogin(usuario: Usuario){
    if (usuario.email === 'usuario@gmail.com' && usuario.senha === '123') {
      this.usuarioAutenticado = true;
      this.mostrarHeader.emit(true);
      this.router.navigate(['chat']);
      usuario.nome = 'Usuario';
      this.behaviorSubject.setUsuario(usuario);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarHeader.emit(false);
    }
  }
}
