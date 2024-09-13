import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTiposSolicitudesComponent } from './mdl-tipos-solicitudes.component';

describe('MdlTiposSolicitudesComponent', () => {
  let component: MdlTiposSolicitudesComponent;
  let fixture: ComponentFixture<MdlTiposSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlTiposSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlTiposSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
