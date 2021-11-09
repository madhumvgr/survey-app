import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDevicesViewComponent } from './completed-devices-view.component';

describe('CompletedDevicesViewComponent', () => {
  let component: CompletedDevicesViewComponent;
  let fixture: ComponentFixture<CompletedDevicesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedDevicesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedDevicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
