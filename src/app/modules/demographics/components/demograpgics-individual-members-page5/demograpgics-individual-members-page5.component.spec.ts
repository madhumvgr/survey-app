import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage5Component } from './demograpgics-individual-members-page5.component';

describe('DemograpgicsIndividualMembersPage5Component', () => {
  let component: DemograpgicsIndividualMembersPage5Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
