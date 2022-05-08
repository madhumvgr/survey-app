import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGenresComponent } from "./DeviceGenresComponent";

describe('DeviceGenresComponent', () => {
  let component: DeviceGenresComponent;
  let fixture: ComponentFixture<DeviceGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
