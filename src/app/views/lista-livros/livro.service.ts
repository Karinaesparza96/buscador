import { LivrosResultado } from './../../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErroService } from 'src/app/erro/erro.service';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient, private erro: ErroService) {}

  listarLivros(term: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', term);
    return this.http.get<LivrosResultado>(this.API, { params });
  }
}
