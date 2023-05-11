import { TestBed } from '@angular/core/testing';

import { ErroService } from './erro.service';

describe('ErroService', () => {
  let service: ErroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
