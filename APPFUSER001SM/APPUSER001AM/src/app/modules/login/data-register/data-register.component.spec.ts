import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRegisterComponent } from './data-register.component';

describe('DataRegisterComponent', () => {
  let component: DataRegisterComponent;
  let fixture: ComponentFixture<DataRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
