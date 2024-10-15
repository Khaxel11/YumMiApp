import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlAppsAdministraComponent} from './mdlappsadministra.component';

describe('MdlAppsAdministraComponent', () => {
  let component: MdlAppsAdministraComponent;
  let fixture: ComponentFixture<MdlAppsAdministraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlAppsAdministraComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlAppsAdministraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
