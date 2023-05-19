import { TestBed } from '@angular/core/testing';

import { TestVersionGuard } from './test-version.guard';

describe('TestVersionGuard', () => {
  let guard: TestVersionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TestVersionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
