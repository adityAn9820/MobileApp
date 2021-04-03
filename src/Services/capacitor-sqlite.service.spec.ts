import { TestBed } from '@angular/core/testing';

import { CapacitorSqliteService } from './capacitor-sqlite.service';

describe('CapacitorSqliteService', () => {
  let service: CapacitorSqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorSqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
