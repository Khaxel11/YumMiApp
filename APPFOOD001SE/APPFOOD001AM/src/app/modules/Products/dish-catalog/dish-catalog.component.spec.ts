import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCatalogComponent } from './dish-catalog.component';

describe('DishCatalogComponent', () => {
  let component: DishCatalogComponent;
  let fixture: ComponentFixture<DishCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
