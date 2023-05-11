import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';

const body = document.querySelector('body');

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.component.html',
  styleUrls: ['./modal-livro.component.css'],
})
export class ModalLivroComponent {
  @Input() src?: string;
  @Input() livro?: LivroVolumeInfo;
  @Output() mudouModal = new EventEmitter();
  statusModal: boolean = true;

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
    if (body) {
      body.style.overflow = 'scroll';
    }
  }

  esconderScroll() {
    if (this.statusModal) {
      if (body) {
        body.style.overflow = 'hidden';
      }
    }
  }

  lerPrevia(livro: LivroVolumeInfo) {
    window.open(livro.previewLink, '_blank');
  }
}
