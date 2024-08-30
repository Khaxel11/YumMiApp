import { ComponentFixture, TestBed } from '@angular/core/testing';

import { mdlAppsadministraComponent } from './mdlappsadministra.component';

describe('mdlAppsadministraComponent', () => {
  let component: mdlAppsadministraComponent;
  let fixture: ComponentFixture<mdlAppsadministraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ mdlAppsadministraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(mdlAppsadministraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
