import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTiposAlimentacionComponent } from './mdl-tipos-alimentacion.component';

describe('MdlTiposAlimentacionComponent', () => {
  let component: MdlTiposAlimentacionComponent;
  let fixture: ComponentFixture<MdlTiposAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlTiposAlimentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlTiposAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
