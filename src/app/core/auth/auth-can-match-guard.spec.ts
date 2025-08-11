import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { authCanMatchGuard } from './auth-can-match-guard';

describe('authCanMatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authCanMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
