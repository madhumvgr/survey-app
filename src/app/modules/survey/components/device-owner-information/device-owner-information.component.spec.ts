import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceOwnerInformationComponent } from './device-owner-information.component';

describe('DeviceOwnerInformationComponent', () => {
  let component: DeviceOwnerInformationComponent;
  let fixture: ComponentFixture<DeviceOwnerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceOwnerInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceOwnerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
