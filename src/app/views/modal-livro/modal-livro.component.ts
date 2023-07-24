import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

import { LivroVolumeInfo } from 'src/app/models/LivroVolumeInfo';

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.component.html',
  styleUrls: ['./modal-livro.component.css'],
})
export class ModalLivroComponent {
  body = this.el.nativeElement.ownerDocument.body;
  @Input() src?: string;
  @Input() livro?: LivroVolumeInfo;
  @Output() changeModal = new EventEmitter();
  statusModal: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  fecharModal() {
    this.statusModal = false;
    this.changeModal.emit(this.statusModal);
    this.esconderScroll();
  }

  esconderScroll() {
    if (this.statusModal) {
      this.renderer.setStyle(this.body, 'overflow', 'hidden');
    } else {
      this.renderer.setStyle(this.body, 'overflow', 'scroll');
    }
  }

  lerPrevia() {
    window.open(this.livro?.previewLink, '_blank');
  }
}
