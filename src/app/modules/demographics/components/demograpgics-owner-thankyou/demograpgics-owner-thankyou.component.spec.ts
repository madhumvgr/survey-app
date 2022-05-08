import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsOwnerThankyouComponent } from './demograpgics-owner-thankyou.component';

describe('DemograpgicsOwnerThankyouComponent', () => {
  let component: DemograpgicsOwnerThankyouComponent;
  let fixture: ComponentFixture<DemograpgicsOwnerThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsOwnerThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsOwnerThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
