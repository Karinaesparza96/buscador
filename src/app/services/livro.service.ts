import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, Observable, tap } from 'rxjs';

import { Item, LivrosResultado } from '../models/interfaces';
import { LivroVolumeInfo } from '../models/LivroVolumeInfo';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient, private notification: NotificationService) { }

  loadBooks(term: string, startIndex: number): Observable<LivrosResultado> {
    if (!term.trim()) return EMPTY;
    const params = new HttpParams()
      .append('q', term)
      .append('startIndex', startIndex);
    return this.http
      .get<LivrosResultado>(this.API, { params })
      .pipe(
        tap(response => {
          if (response.totalItems === 0) {
            this.notification.info('Não foi encontrado livros com este termo')
          }
        })
      )

  }

  convertApiBooksToLivro(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }

}
