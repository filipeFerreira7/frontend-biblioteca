import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {LivrosCardListComponent} from '../livros-card-list/livros-card-list';


@Component({
  selector: 'app-home-client',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, LivrosCardListComponent],
  templateUrl: './home-client.html',
  styleUrl: './home-client.css'
})
export class HomeClientComponent {

}
