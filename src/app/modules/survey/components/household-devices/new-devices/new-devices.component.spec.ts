import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDevicesComponent } from './new-devices.component';

describe('NewDevicesComponent', () => {
  let component: NewDevicesComponent;
  let fixture: ComponentFixture<NewDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
