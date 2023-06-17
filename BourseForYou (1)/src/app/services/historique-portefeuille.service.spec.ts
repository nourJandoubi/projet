import { TestBed } from '@angular/core/testing';

import { HistoriquePortefeuilleService } from './historique-portefeuille.service';

describe('HistoriquePortefeuilleService', () => {
  let service: HistoriquePortefeuilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriquePortefeuilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
