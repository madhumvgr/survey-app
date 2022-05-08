import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterkeyComponent } from './registerkey.component';

describe('RegisterkeyComponent', () => {
  let component: RegisterkeyComponent;
  let fixture: ComponentFixture<RegisterkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterkeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
