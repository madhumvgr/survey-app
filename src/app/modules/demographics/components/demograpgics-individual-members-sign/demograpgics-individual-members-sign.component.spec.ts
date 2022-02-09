import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsIndividualMembersSignComponent } from './demograpgics-individual-members-sign.component';

describe('DemograpgicsIndividualMembersSignComponent', () => {
  let component: DemograpgicsIndividualMembersSignComponent;
  let fixture: ComponentFixture<DemograpgicsIndividualMembersSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsIndividualMembersSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsIndividualMembersSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
