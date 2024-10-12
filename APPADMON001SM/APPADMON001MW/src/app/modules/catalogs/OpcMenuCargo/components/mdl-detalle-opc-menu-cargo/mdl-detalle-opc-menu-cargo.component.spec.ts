import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlDetalleOpcMenuCargoComponent } from './mdl-detalle-opc-menu-cargo.component';

describe('MdlDetalleOpcMenuCargoComponent', () => {
  let component: MdlDetalleOpcMenuCargoComponent;
  let fixture: ComponentFixture<MdlDetalleOpcMenuCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlDetalleOpcMenuCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlDetalleOpcMenuCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
