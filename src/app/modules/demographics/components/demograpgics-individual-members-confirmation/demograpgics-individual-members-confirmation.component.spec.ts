import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersConfirmationComponent } from './demograpgics-individual-members-confirmation.component';

describe('DemograpgicsIndividualMembersConfirmationComponent', () => {
  let component: DemograpgicsIndividualMembersConfirmationComponent;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
