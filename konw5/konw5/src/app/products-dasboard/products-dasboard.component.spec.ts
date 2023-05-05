import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDasboardComponent } from './products-dasboard.component';

describe('ProductsDasboardComponent', () => {
  let component: ProductsDasboardComponent;
  let fixture: ComponentFixture<ProductsDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDasboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
