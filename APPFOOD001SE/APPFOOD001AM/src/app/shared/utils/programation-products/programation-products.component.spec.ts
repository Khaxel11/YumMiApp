import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramationProductsComponent } from './programation-products.component';

describe('ProgramationProductsComponent', () => {
  let component: ProgramationProductsComponent;
  let fixture: ComponentFixture<ProgramationProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramationProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramationProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
