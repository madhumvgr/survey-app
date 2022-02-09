import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage4Component } from './demograpgics-individual-members-page4.component';

describe('DemograpgicsIndividualMembersPage4Component', () => {
  let component: DemograpgicsIndividualMembersPage4Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
