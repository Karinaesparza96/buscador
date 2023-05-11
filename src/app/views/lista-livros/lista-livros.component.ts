import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { LivrosService } from './livro.service';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnInit {
  searchTerms = new Subject<string>();
  listaLivros$?: Observable<LivroVolumeInfo[]>;
  livrosEncontrados$?: Observable<number>;
  msgErro = '';

  @ViewChild('searchBox') searchBox?: ElementRef<HTMLElement>;

  constructor(private http: LivrosService) {}

  ngOnInit(): void {
    this.searchBox?.nativeElement.focus();
    this.listaLivros$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.http.listarLivros(term)),
      //tap((res) => console.log('Pos switchMap', res)),
      map((res) => this.http.livrosRetornoApiParaLivro(res)),
      catchError(() => {
        this.msgErro = 'Ops ocorreu um erro, tente recarregar a pagina.';
        return EMPTY;
      })
      //tap((res) => console.log('Pos map', res))
    );
    this.livrosEncontrados$ = this.http.getTotalLivros();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
