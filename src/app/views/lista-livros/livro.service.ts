import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, map, catchError, Subject } from 'rxjs';
import { ErroService } from 'src/app/erro/erro.service';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';
import { Item, LivrosResultado } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient, private erro: ErroService) {}

  totalLivros = new Subject<number>();

  getTotalLivros() {
    return this.totalLivros.asObservable();
  }

  listarLivros(term: string): Observable<Item[]> {
    if (!term.trim()) {
      this.totalLivros.next(0);
      return of([]);
    }
    const options = { params: new HttpParams().set('q', term) };
    return this.http.get<LivrosResultado>(this.API, options).pipe(
      tap((res) => this.totalLivros.next(res.totalItems)),
      map((res) => res.items ?? []),
      catchError(this.erro.handleError<Item[]>('Falha ao listar livros', []))
    );
  }

  livrosRetornoApiParaLivro(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }
}
