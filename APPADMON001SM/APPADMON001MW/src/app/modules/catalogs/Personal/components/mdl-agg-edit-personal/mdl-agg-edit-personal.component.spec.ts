import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlAggEditPersonalComponent } from './mdl-agg-edit-personal.component';

describe('MdlAggEditPersonalComponent', () => {
  let component: MdlAggEditPersonalComponent;
  let fixture: ComponentFixture<MdlAggEditPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlAggEditPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlAggEditPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
