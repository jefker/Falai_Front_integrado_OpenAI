import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;


  ngOnInit(): void {    
    this.items = [
      { label: 'CHAT', routerLink: '/chat' },
      { label: 'BLOG', routerLink: '/blog' },
      { label: 'SOBRE', routerLink: '/sobre' },
      { label: 'SAIR', routerLink: '/login' }
    ];

    this.activeItem = this.items[0];
  }
}
