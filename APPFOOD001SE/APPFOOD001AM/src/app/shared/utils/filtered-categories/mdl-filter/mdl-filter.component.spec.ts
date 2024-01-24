import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlFilterComponent } from './mdl-filter.component';

describe('MdlFilterComponent', () => {
  let component: MdlFilterComponent;
  let fixture: ComponentFixture<MdlFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
