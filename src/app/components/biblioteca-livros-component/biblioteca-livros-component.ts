import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/BibliotecaService';
import { Livro } from '../../../models/Livro';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-biblioteca-livros',
  standalone: true, // 👈 se ainda não estiver declarado
  templateUrl: './biblioteca-livros-component.html',
  styleUrls: ['./biblioteca-livros-component.css'],
  imports: [CommonModule, FormsModule,MatToolbarModule,RouterLink,MatIcon] // 👈 Adicione aqui o CommonModule
})
export class BibliotecaLivrosComponent implements OnInit {
  livros: Livro[] = [];
  usuarioMat!: String;
  usuarioId!: number;
  mensagem: string = '';
  erro: string = '';

  constructor(private bibliotecaService: BibliotecaService, private snackBar: MatSnackBar) {}

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
  if (!this.usuarioMat) {
    this.erro = 'Informe a matrícula do usuário para emprestar um livro.';
    return;
  }

  this.bibliotecaService.emprestarLivro(this.usuarioMat, idLivro).subscribe({
    next: (livroEmprestado) => {
      const livro = this.livros.find(l => l.id === idLivro);
      const tituloLivro = livro ? livro.titulo : 'o livro';
      
      this.snackBar.open(
        `Empréstimo do livro "${tituloLivro}" realizado com sucesso para o usuário de matrícula ${this.usuarioMat}`,
        'Fechar',
        {
          duration: 7000, // 5 segundos
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
      
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
