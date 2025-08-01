import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Livro } from '../../../models/Livro';
import { LivroService } from '../../services/LivroService';

@Component({
  selector: 'app-ver-mais',
  standalone:true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    CommonModule,
    MatProgressSpinnerModule,
    RouterLink,
    MatToolbar,
    MatMenuModule
  ],
  templateUrl: './ver-mais.component.html',
  styleUrl: './ver-mais.component.css',
})
export class VerMaisComponent implements OnInit {
  livro: Livro | undefined;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private livroService: LivroService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarLivro(Number(id));
    }
  }

  carregarLivro(id: number): void {
    this.livroService.findById(id).subscribe({
      next: (livro) => {
        this.livro = livro;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Livro não encontrado.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
    });
  }
}
