import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlOpcMenuCargoComponent } from './mdl-opc-menu-cargo.component';

describe('MdlOpcMenuCargoComponent', () => {
  let component: MdlOpcMenuCargoComponent;
  let fixture: ComponentFixture<MdlOpcMenuCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlOpcMenuCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlOpcMenuCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
