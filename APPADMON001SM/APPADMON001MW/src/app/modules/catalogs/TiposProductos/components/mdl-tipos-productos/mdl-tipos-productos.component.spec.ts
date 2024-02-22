import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlTiposProductosComponent } from './mdl-tipos-productos.component';

describe('MdlTiposProductosComponent', () => {
  let component: MdlTiposProductosComponent;
  let fixture: ComponentFixture<MdlTiposProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlTiposProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlTiposProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
