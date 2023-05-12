import { Component } from '@angular/core';

import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { LivrosService } from './livro.service';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';
import { Item, LivrosResultado } from 'src/app/models/interfaces';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  searchTerms = new Subject<string>();

  msgErroSemItens = 'Nao foi encontrado';
  livrosResultado?: LivrosResultado;

  constructor(private livroService: LivrosService) {}

  livrosRetornoApiParaLivro(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }

  listaLivros$ = this.searchTerms.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((term: string) => this.livroService.listarLivros(term)),
    map((res) => (this.livrosResultado = res)),
    map((res) => res.items ?? []),
    map((items) => this.livrosRetornoApiParaLivro(items))
  );

  search(term: string): void {
    console.log(term);
    this.searchTerms.next(term);
  }
}
