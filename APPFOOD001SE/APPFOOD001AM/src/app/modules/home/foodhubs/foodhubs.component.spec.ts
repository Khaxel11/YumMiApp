import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodhubsComponent } from './foodhubs.component';

describe('FoodhubsComponent', () => {
  let component: FoodhubsComponent;
  let fixture: ComponentFixture<FoodhubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodhubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodhubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
