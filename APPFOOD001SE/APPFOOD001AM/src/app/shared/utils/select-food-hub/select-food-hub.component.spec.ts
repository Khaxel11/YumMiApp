import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFoodHubComponent } from './select-food-hub.component';

describe('SelectFoodHubComponent', () => {
  let component: SelectFoodHubComponent;
  let fixture: ComponentFixture<SelectFoodHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFoodHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFoodHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
