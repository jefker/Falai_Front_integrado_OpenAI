import { Component, ElementRef, OnInit, ViewChild, asNativeElements } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  @ViewChild('mensagem') mensagem!: ElementRef<HTMLInputElement>;
  @ViewChild('resposta') resposta!: ElementRef<HTMLTextAreaElement>;

  OPENAI_API_KEY = environment.openAiApiKey;

  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;


  ngOnInit(): void {    
    this.items = [
      { label: 'CHAT' },
      { label: 'BLOG', routerLink: '/blog' },
      { label: 'SOBRE', routerLink: '/sobre' },
      { label: 'SAIR', routerLink: '' }
    ];

    this.activeItem = this.items[0];

    setTimeout(() => {
      this.showPrompt();
    }, 2000);
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.mensagem.nativeElement.value && event.key === 'Enter') {
      this.sendQuestion();
    }
  }
  
  showPrompt() {
    const text = 'Olá! Sou um especialista em publicidade e estou aqui para ajudar você a criar conteúdos incríveis.';
    let index = 0;
    const tempoAparicaoletras = 25; // Intervalo em milissegundos entre cada letra aparecer
  
    this.resposta.nativeElement.value += 'Falai: ';

    const interval = setInterval(() => {
      if (index < text.length) {
        this.resposta.nativeElement.value += text.charAt(index);
        index++;
        this.resposta.nativeElement.scrollTop = this.resposta.nativeElement.scrollHeight;
      } else {
        clearInterval(interval);
      }
    }, tempoAparicaoletras);
  }
  
  sendQuestion() {
    const sQuestion = this.mensagem.nativeElement.value;
    const palavrasChave = "Marketing digital, Estratégias de marketing, SEO (Search Engine Optimization), Redes sociais, Conteúdo online, Publicidade digital, Mídias sociais, E-commerce, Análise de dados, Marketing de influência"

    let index = 0;
    const tempoAparicaoletras = 25;

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '' },
          { role: 'user', content: palavrasChave + " | " + sQuestion }
        ],
        max_tokens: 750,
        temperature: 0.6,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (this.resposta.nativeElement.value) {
          this.resposta.nativeElement.value += '\n'
        }

        if (json.choices?.[0]?.message?.content) {
          const text = json.choices[0].message.content || 'Sem resposta';

          this.resposta.nativeElement.value += 'Falai: ';
  
          const interval = setInterval(() => {
            if (index < text.length) {
              this.resposta.nativeElement.value += text.charAt(index);
              index++;
              this.resposta.nativeElement.scrollTop = this.resposta.nativeElement.scrollHeight;
            } else {
              clearInterval(interval);
              this.resposta.nativeElement.scrollTop = this.resposta.nativeElement.scrollHeight;
  
              this.mensagem.nativeElement.disabled = false;
              this.mensagem.nativeElement.focus();
            }
          }, tempoAparicaoletras);
        }

        if (json.error?.message) {
          this.resposta.nativeElement.value += `Error: ${json.error.message}`;
        } else if (json.choices?.[0]?.message?.content) {
          const text = json.choices[0].message.content || 'Sem resposta';
        }

        this.resposta.nativeElement.scrollTop = this.resposta.nativeElement.scrollHeight;
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        this.mensagem.nativeElement.value = '';
        this.mensagem.nativeElement.disabled = false;
        this.mensagem.nativeElement.focus();
      });

    if (this.resposta.nativeElement.value) {
      this.resposta.nativeElement.value += '\n\n';
    }

    this.resposta.nativeElement.value += 'Eu: ';
    this.resposta.nativeElement.value += `${sQuestion}\n` ;
    this.mensagem.nativeElement.value = 'Carregando...';
    this.mensagem.nativeElement.disabled = true;

    this.resposta.nativeElement.scrollTop = this.resposta.nativeElement.scrollHeight;
  }
}
