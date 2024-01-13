import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStartComponent } from './menu-start.component';

describe('MenuStartComponent', () => {
  let component: MenuStartComponent;
  let fixture: ComponentFixture<MenuStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
