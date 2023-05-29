import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  // template: `<p>URL da API: {{ apiURL }}</p>`,
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  // apiUrl = environment.apiBaseUrl;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  ngOnInit(): void {
    // this.chat();
    
    this.items = [
      { label: 'CHAT' },
      { label: 'BLOG' },
      { label: 'SOBRE' },
      { label: 'SAIR' }
  ];

  this.activeItem = this.items[0];
  }
  
  resposta = document.getElementById("resposta");
  mensagem = document.getElementById("mensagem");

  // chat() {
  //   this.mensagem?.addEventListener("keypress", (e) => {     // Verifica se no campo de resposta tem algo,
  //     if (this.mensagem && e.key === "Enter")                // caso tenha, ao pressionar a tecla "Enter"
  //     this.enviarMensagem;                                   // chamará a função SendQuestion()
  //   });
  // };
  
  // const OPEN_AI_KEY = ""; 

  // enviarMensagem() {
  //   var enviarMensagem = this.mensagem;

  //   if (this.resposta) this.resposta += '\n\n';

  //   this.resposta += `Eu: ${enviarMensagem}`;
  //   this.mensagem = "Carregando...";
  //   this.mensagem.disabled = true;

  //   this.resposta?.scrollTop = this.resposta?.scrollHeight;
  // }

}
