import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCompletedProgramationComponent } from './mdl-completed-programation.component';

describe('MdlCompletedProgramationComponent', () => {
  let component: MdlCompletedProgramationComponent;
  let fixture: ComponentFixture<MdlCompletedProgramationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCompletedProgramationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCompletedProgramationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
