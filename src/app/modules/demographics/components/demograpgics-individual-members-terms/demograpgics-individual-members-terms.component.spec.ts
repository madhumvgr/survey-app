import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersTermsComponent } from './demograpgics-individual-members-terms.component';

describe('DemograpgicsIndividualMembersTermsComponent', () => {
  let component: DemograpgicsIndividualMembersTermsComponent;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
