import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposusuariosComponent } from './tiposusuarios.component';

describe('TiposusuariosComponent', () => {
  let component: TiposusuariosComponent;
  let fixture: ComponentFixture<TiposusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
