import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCapturaCategoriasComponent } from './mdl-captura-categorias.component';

describe('MdlCapturaCategoriasComponent', () => {
  let component: MdlCapturaCategoriasComponent;
  let fixture: ComponentFixture<MdlCapturaCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCapturaCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCapturaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
