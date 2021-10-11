import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotInUseDevicesComponent } from './not-in-use-devices.component';

describe('NotInUseDevicesComponent', () => {
  let component: NotInUseDevicesComponent;
  let fixture: ComponentFixture<NotInUseDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotInUseDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotInUseDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
