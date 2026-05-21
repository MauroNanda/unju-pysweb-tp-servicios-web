import { TestBed } from '@angular/core/testing';

import { Autos } from './autos';

describe('Autos', () => {
  let service: Autos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
