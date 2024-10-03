import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposAlimentacionComponent } from './tipos-alimentacion.component';

describe('TiposAlimentacionComponent', () => {
  let component: TiposAlimentacionComponent;
  let fixture: ComponentFixture<TiposAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposAlimentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
