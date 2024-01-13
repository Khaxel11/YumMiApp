import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlDetailFoodhubComponent } from './mdl-detail-foodhub.component';

describe('MdlDetailFoodhubComponent', () => {
  let component: MdlDetailFoodhubComponent;
  let fixture: ComponentFixture<MdlDetailFoodhubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlDetailFoodhubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlDetailFoodhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
