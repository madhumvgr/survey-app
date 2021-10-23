import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyhelpComponent } from './keyhelp.component';

describe('KeyhelpComponent', () => {
  let component: KeyhelpComponent;
  let fixture: ComponentFixture<KeyhelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyhelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
