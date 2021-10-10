import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressDevicesComponent } from './in-progress-devices.component';

describe('InProgressDevicesComponent', () => {
  let component: InProgressDevicesComponent;
  let fixture: ComponentFixture<InProgressDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
