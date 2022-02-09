import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage3Component } from './demograpgics-individual-members-page3.component';

describe('DemograpgicsIndividualMembersPage3Component', () => {
  let component: DemograpgicsIndividualMembersPage3Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
