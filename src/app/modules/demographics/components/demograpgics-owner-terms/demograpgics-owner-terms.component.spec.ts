import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsOwnerTermsComponent } from './demograpgics-owner-terms.component';

describe('DemograpgicsOwnerTermsComponent', () => {
  let component: DemograpgicsOwnerTermsComponent;
  let fixture: ComponentFixture<DemograpgicsOwnerTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsOwnerTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsOwnerTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
