import { TestBed } from '@angular/core/testing';

import { BourseService } from './bourse.service';

describe('BourseService', () => {
  let service: BourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
