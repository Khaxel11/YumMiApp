import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCategoriesComponent } from './filtered-categories.component';

describe('FilteredCategoriesComponent', () => {
  let component: FilteredCategoriesComponent;
  let fixture: ComponentFixture<FilteredCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
