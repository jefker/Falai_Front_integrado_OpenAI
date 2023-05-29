import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

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

}
