import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersPage7Component } from './demograpgics-individual-members-page7.component';

describe('DemograpgicsIndividualMembersPage7Component', () => {
  let component: DemograpgicsIndividualMembersPage7Component;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersPage7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersPage7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersPage7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
