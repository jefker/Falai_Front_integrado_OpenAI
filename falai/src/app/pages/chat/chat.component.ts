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
      { label: 'BLOG' },
      { label: 'SOBRE' },
      { label: 'SAIR' }
  ];

  this.activeItem = this.items[0];
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.mensagem.nativeElement.value && event.key === 'Enter') {
      this.sendQuestion();
    }
  }
  
  sendQuestion() {
    const sQuestion = this.mensagem.nativeElement.value;

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: sQuestion,
        max_tokens: 1000,
        temperature: 0.4,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (this.resposta.nativeElement.value) {
          this.resposta.nativeElement.value += '\n'
        }

        if (json.error?.message) {
          this.resposta.nativeElement.value += `Error: ${json.error.message}`;
        } else if (json.choices?.[0].text) {
          const text = json.choices[0].text || 'Sem resposta';
          this.resposta.nativeElement.value += 'Falai: ' + text;
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

    this.resposta.nativeElement.value += `Eu: ${sQuestion}\n` ;
    this.mensagem.nativeElement.style.fontStyle = 'italic';
    this.mensagem.nativeElement.value = 'Carregando...';
    this.mensagem.nativeElement.disabled = true;

    this.resposta.nativeElement.scrollTop = this.resposta.nativeElement.scrollHeight;
  }
}
