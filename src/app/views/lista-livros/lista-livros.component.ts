import { Component, ViewChild } from '@angular/core';

import { map } from 'rxjs';

import { LivrosService } from '../../services/livro.service';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';
import { LivrosResultado } from 'src/app/models/interfaces';
import { InputComponent } from 'src/app/componentes/input/input.component';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  @ViewChild('searchBox') searchBox?: InputComponent


  totalBooks?: number | null;
  startIndex = 0
  booksList: LivroVolumeInfo[] = [];

  constructor(private livroService: LivrosService) { }

  loadMoreBooks(): void {
    this.startIndex += 10
    const termoBusca = this.searchBox?.getSearchValue()
    if (termoBusca) {
      this.livroService
        .loadBooks(termoBusca, this.startIndex)
        .pipe(map(res => this.processResponse(res))).subscribe();
    }
  }

  searchTermChanged() {
    this.totalBooks = this.startIndex = 0
    this.booksList = []
  }

  processResponse(data: LivrosResultado) {
    if (data) {
      this.totalBooks = data.totalItems;
      this.booksList.push(...this.livroService.convertApiBooksToLivro(
        data.items
      ))
    }
  }

}
