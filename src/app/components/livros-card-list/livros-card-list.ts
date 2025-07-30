import {Component, Injectable, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Livro} from '../../../models/Livro';
import {Observable} from 'rxjs';
import {LivroService} from '../../services/LivroService';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
type Card = {
  id: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
}

@Component({
  selector: 'app-livros-card-list',
  imports: [RouterLink,MatToolbarModule,MatButtonModule,MatCardModule,CommonModule],
  templateUrl: './livros-card-list.html',
  styleUrl: './livros-card-list.css'
})
export class LivrosCardList implements OnInit {
  livros: Livro[] = [];
  cards = signal<Card[]>([]);

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livroService.getAll().subscribe({
      next: (data) => {
        this.livros = data;
        this.prepararCards();
      },
      error: (err) => console.error('Erro ao carregar livros:', err)
    });
  }

  prepararCards(): void {
    const cards: Card[] = this.livros.map(livro => ({
      id: livro.id,
      titulo: livro.titulo,
      autor: livro.autor,
      disponivel: livro.disponivel
    }));
    this.cards.set(cards);
  }
}
