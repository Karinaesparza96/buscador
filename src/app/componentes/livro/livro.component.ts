import { Component, Input, OnInit } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent {
  @Input() livro?: LivroVolumeInfo;

  getImage(livro: any) {
    return (
      livro?.thumbnail?.thumbnail ?? 'assets/imagens/capa-indisponivel.png'
    );
  }
  modalAberto?: boolean;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
