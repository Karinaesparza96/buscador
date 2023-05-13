import { Component } from '@angular/core';

import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
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

  constructor(private livroService: LivrosService) {
    //livroService.listarLivros('java').subscribe((x) => console.log(x));
  }

  livrosRetornoApiParaLivro(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }

  listaLivros$ = this.searchTerms.pipe(
    debounceTime(300),
    //filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((term) => {
      return this.livroService.listarLivros(term);
    }),
    map((res) => (this.livrosResultado = res)),
    map((res) => res?.items ?? []),
    map((items) => this.livrosRetornoApiParaLivro(items))
  );

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
