import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMenuComponent } from './tabs-menu.component';

describe('TabsMenuComponent', () => {
  let component: TabsMenuComponent;
  let fixture: ComponentFixture<TabsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
