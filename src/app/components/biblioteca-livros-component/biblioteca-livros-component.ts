import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/BibliotecaService';
import { Livro } from '../../../models/Livro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-biblioteca-livros',
  standalone: true, // 👈 se ainda não estiver declarado
  templateUrl: './biblioteca-livros-component.html',
  styleUrls: ['./biblioteca-livros-component.css'],
  imports: [CommonModule, FormsModule,MatToolbarModule,RouterLink] // 👈 Adicione aqui o CommonModule
})
export class BibliotecaLivrosComponent implements OnInit {
  livros: Livro[] = [];
  usuarioId!: number;
  mensagem: string = '';
  erro: string = '';

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.bibliotecaService.listarLivrosDisponiveis().subscribe({
      next: (data) => {
        this.livros = data;
        this.mensagem = '';
        this.erro = '';
      },
      error: (err) => {
        this.erro = 'Erro ao carregar livros: ' + (err.message || err.statusText);
      }
    });
  }

  emprestarLivro(idLivro: number): void {
    if (!this.usuarioId) {
      this.erro = 'Informe o ID do usuário para emprestar um livro.';
      return;
    }

    this.bibliotecaService.emprestarLivro(this.usuarioId, idLivro).subscribe({
      next: () => {
        this.mensagem = 'Livro emprestado com sucesso!';
        this.erro = '';
        this.carregarLivros();
      },
      error: (err) => {
        this.erro = 'Erro ao emprestar livro: ' + (err.error?.message || err.message || err.statusText);
        this.mensagem = '';
      }
    });
  }

  devolverLivro(idLivro: number): void {
    if (!this.usuarioId) {
      this.erro = 'Informe o ID do usuário para devolver um livro.';
      return;
    }

    this.bibliotecaService.devolverLivro(this.usuarioId, idLivro).subscribe({
      next: () => {
        this.mensagem = 'Livro devolvido com sucesso!';
        this.erro = '';
        this.carregarLivros();
      },
      error: (err) => {
        this.erro = 'Erro ao devolver livro: ' + (err.error?.message || err.message || err.statusText);
        this.mensagem = '';
      }
    });
  }
}
