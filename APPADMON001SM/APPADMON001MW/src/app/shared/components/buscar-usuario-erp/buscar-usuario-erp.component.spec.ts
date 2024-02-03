import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarUsuarioERPComponent } from './buscar-usuario-erp.component';

describe('BuscarUsuarioERPComponent', () => {
  let component: BuscarUsuarioERPComponent;
  let fixture: ComponentFixture<BuscarUsuarioERPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarUsuarioERPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarUsuarioERPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
