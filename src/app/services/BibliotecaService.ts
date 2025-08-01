import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../../models/Livro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private baseUrl = 'http://localhost:8080/biblioteca';

  constructor(private http: HttpClient) {}

  listarLivrosDisponiveis(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.baseUrl}/listarLivrosDisponiveis`);
  }

  emprestarLivro(idUser: number, idLivro: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/emprestar/${idUser}/${idLivro}`, null);
  }

  devolverLivro(idUser: number, idLivro: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/devolver/${idUser}/${idLivro}`, null);
  }
}
