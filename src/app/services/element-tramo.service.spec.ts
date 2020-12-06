import { TestBed } from '@angular/core/testing';

import { ElementTramoService } from './element-tramo.service';

describe('ElementTramoService', () => {
  let service: ElementTramoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementTramoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
