import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcMenuCargoComponent } from './opc-menu-cargo.component';

describe('OpcMenuCargoComponent', () => {
  let component: OpcMenuCargoComponent;
  let fixture: ComponentFixture<OpcMenuCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcMenuCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcMenuCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
