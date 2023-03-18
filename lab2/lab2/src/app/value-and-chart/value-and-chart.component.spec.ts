import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAndChartComponent } from './value-and-chart.component';

describe('ValueAndChartComponent', () => {
  let component: ValueAndChartComponent;
  let fixture: ComponentFixture<ValueAndChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueAndChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueAndChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
