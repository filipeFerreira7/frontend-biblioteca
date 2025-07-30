import { Routes } from '@angular/router';
import {HomeClient} from './components/home-client/home-client';

export const routes: Routes = [
  {
    path: '', component: HomeClient, title: 'Página inicial'
  }
];
