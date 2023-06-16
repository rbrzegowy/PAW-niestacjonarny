import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSerwisComponent } from './test-serwis.component';

describe('TestSerwisComponent', () => {
  let component: TestSerwisComponent;
  let fixture: ComponentFixture<TestSerwisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSerwisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSerwisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
