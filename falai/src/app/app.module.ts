import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { environment as environmentProd } from '../environments/environment.prod';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TabMenuModule } from 'primeng/tabmenu';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginService } from './core/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabMenuModule
  ],

  providers: [
    LoginService,
    { provide: 'APP_ENV', useValue: environment },
    { provide: 'APP_ENV_PROD', useValue: environmentProd }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
