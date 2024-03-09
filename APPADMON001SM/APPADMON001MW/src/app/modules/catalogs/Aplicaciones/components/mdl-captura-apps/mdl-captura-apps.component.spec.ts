import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlCapturaAppsComponent } from './mdl-captura-apps.component';

describe('MdlCapturaComponent', () => {
  let component: MdlCapturaAppsComponent;
  let fixture: ComponentFixture<MdlCapturaAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlCapturaAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlCapturaAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
