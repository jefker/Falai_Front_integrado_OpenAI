import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'sobre', component: SobreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
