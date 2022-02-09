import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage1Component } from './demograpgics-individual-members-page1.component';

describe('DemograpgicsIndividualMembersPage1Component', () => {
  let component: DemograpgicsIndividualMembersPage1Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
