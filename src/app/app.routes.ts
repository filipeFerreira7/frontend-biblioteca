import { Routes } from '@angular/router';
import {HomeClientComponent} from './components/home-client/home-client';
import { LivrosFormComponent } from './components/livros-form/livros-form';
import path from 'path';
import { NotFoundComponent } from './components/not-found-component/not-found-component';
import { VerMaisComponent } from './components/ver-mais.component/ver-mais.component';
import { BibliotecaLivrosComponent } from './components/biblioteca-livros-component/biblioteca-livros-component';
export const routes: Routes = [
  {
    path: '', component: HomeClientComponent, title: 'Página inicial',
  },
  {path:'postLivros', component: LivrosFormComponent, title: 'Upload de Livros'},
  {path:'livros/:id', component: VerMaisComponent, title: 'Ver Mais'},
  {path: 'biblioteca', component:BibliotecaLivrosComponent, title: 'Serviços de Biblioteca'},

   { path: '**', component: NotFoundComponent, title: 'Não encontrado' }
];
