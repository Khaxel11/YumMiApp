import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCapturaTipoComponent } from './mdl-captura-tipo.component';

describe('MdlCapturaTipoComponent', () => {
  let component: MdlCapturaTipoComponent;
  let fixture: ComponentFixture<MdlCapturaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCapturaTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCapturaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
