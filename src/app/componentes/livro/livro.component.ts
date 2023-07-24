import { Component, Input } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent {
  modalShow: boolean = false;
  @Input() livro?: LivroVolumeInfo;

  getImage() {
    return (
      this.livro?.thumbnail?.thumbnail ?? 'assets/imagens/capa-indisponivel.png'
    );
  }

  onModalChange(evento: boolean) {
    this.modalShow = evento;
  }
}
