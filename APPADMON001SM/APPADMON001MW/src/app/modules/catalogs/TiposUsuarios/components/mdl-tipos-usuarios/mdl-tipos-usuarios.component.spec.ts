import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTiposUsuariosComponent } from './mdl-tipos-usuarios.component';

describe('MdlTiposUsuariosComponent', () => {
  let component: MdlTiposUsuariosComponent;
  let fixture: ComponentFixture<MdlTiposUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlTiposUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlTiposUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
