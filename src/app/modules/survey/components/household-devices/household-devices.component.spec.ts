import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdDevicesComponent } from './household-devices.component';

describe('HouseholdDevicesComponent', () => {
  let component: HouseholdDevicesComponent;
  let fixture: ComponentFixture<HouseholdDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
