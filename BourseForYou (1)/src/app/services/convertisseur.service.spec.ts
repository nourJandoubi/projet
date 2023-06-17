import { TestBed } from '@angular/core/testing';

import { ConvertisseurService } from './convertisseur.service';

describe('ConvertisseurService', () => {
  let service: ConvertisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
