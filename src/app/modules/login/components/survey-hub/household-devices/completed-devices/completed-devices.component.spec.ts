import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDevicesComponent } from './completed-devices.component';

describe('CompletedDevicesComponent', () => {
  let component: CompletedDevicesComponent;
  let fixture: ComponentFixture<CompletedDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
