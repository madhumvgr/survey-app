import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersComponent } from './demograpgics-individual-members.component';

describe('DemograpgicsIndividualMembersComponent', () => {
  let component: DemograpgicsIndividualMembersComponent;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
