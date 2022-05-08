import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsOwnerConfirmationComponent } from './demograpgics-owner-confirmation.component';

describe('DemograpgicsOwnerConfirmationComponent', () => {
  let component: DemograpgicsOwnerConfirmationComponent;
  let fixture: ComponentFixture<DemograpgicsOwnerConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsOwnerConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsOwnerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
