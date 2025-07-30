import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro} from '../../models/Livro';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private baseUrl = 'http://localhost:8080/livros';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Livro[]> {
    return this.httpClient.get<Livro[]>(this.baseUrl);
  }

  findById(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.baseUrl}/${id}`);
  }

  insert(livro: Livro): Observable<Livro> {
    return this.httpClient.post<Livro>(this.baseUrl, livro);
  }

  update(livro: Livro): Observable<Livro> {
    return this.httpClient.put<Livro>(`${this.baseUrl}/${livro.id}`, livro);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
