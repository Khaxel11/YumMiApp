import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetModalComponent } from './sheet-modal.component';

describe('SheetModalComponent', () => {
  let component: SheetModalComponent;
  let fixture: ComponentFixture<SheetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
