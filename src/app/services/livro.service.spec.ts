import { TestBed } from '@angular/core/testing';

import { LivrosService } from './livro.service';

describe('ServiceService', () => {
  let service: LivrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
