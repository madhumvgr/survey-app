import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersThankyouComponent } from './demograpgics-individual-members-thankyou.component';

describe('DemograpgicsIndividualMembersThankyouComponent', () => {
  let component: DemograpgicsIndividualMembersThankyouComponent;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
