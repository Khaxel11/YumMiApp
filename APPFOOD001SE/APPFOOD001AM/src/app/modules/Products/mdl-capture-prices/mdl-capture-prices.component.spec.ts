import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCapturePricesComponent } from './mdl-capture-prices.component';

describe('MdlCapturePricesComponent', () => {
  let component: MdlCapturePricesComponent;
  let fixture: ComponentFixture<MdlCapturePricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCapturePricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCapturePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
