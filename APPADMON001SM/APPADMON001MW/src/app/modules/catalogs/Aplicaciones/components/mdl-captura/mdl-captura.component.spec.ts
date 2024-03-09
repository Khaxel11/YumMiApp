import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCapturaComponent } from './mdl-captura.component';

describe('MdlCapturaComponent', () => {
  let component: MdlCapturaComponent;
  let fixture: ComponentFixture<MdlCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCapturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
