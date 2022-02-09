import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicsHomeComponent } from '../demographics-home.component';

describe('demographicsHomeComponent', () => {
  let component: DemographicsHomeComponent;
  let fixture: ComponentFixture<DemographicsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
