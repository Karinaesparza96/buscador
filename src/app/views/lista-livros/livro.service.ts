import { LivrosResultado } from './../../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  listarLivros(term: string): Observable<LivrosResultado | undefined> {
    if (!term) {
      return of();
    }
    const params = new HttpParams().append('q', term);
    return this.http.get<LivrosResultado>(this.API, { params });
  }
}
