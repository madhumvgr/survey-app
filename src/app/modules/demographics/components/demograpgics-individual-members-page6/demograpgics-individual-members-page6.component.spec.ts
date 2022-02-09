import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage6Component } from './demograpgics-individual-members-page6.component';

describe('DemograpgicsIndividualMembersPage6Component', () => {
  let component: DemograpgicsIndividualMembersPage6Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
