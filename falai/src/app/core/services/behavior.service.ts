import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../interface/usuario';


@Injectable({
  providedIn: 'root'
})

export class BehaviorService {

  private usuarioData = new BehaviorSubject<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: ''
  });

  constructor() { }

  setUsuario (usuario: Usuario): void {
    this.usuarioData.next(usuario);
  }

  getUsuario(): Observable<Usuario> {
    return this.usuarioData.asObservable();
  }

}
