import { TestBed } from '@angular/core/testing';

import { DateGuard } from './date.guard';

describe('DateGuard', () => {
  let guard: DateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
