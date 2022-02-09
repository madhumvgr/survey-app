import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage2Component } from './demograpgics-individual-members-page2.component';

describe('DemograpgicsIndividualMembersPage2Component', () => {
  let component: DemograpgicsIndividualMembersPage2Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
