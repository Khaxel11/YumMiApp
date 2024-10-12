import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlPromocionesComponent } from './mdl-promociones.component';

describe('MdlPromocionesComponent', () => {
  let component: MdlPromocionesComponent;
  let fixture: ComponentFixture<MdlPromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlPromocionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
