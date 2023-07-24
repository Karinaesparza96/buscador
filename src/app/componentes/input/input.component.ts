import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { LivrosService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('searchBox', { read: ElementRef })
  campoInput?: ElementRef<HTMLInputElement>;

  @Output() emitter = new EventEmitter();
  @Output() searchTermChanged = new EventEmitter();
  destroy$ = new Subject<void>();

  private _searchTerms = new Subject<string>();

  searchTerms$ = this._searchTerms.asObservable();
  loadedQuantity = 10;

  constructor(private livroService: LivrosService) { }

  ngOnInit(): void {
    this.searchTerms$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.searchTermChanged.emit();
          return this.livroService.loadBooks(term, 0);
        })
      )
      .subscribe((response) => this.emitter.emit(response));
  }

  search(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this._searchTerms.next(value);
  }

  getSearchValue() {
    return this.campoInput?.nativeElement.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
