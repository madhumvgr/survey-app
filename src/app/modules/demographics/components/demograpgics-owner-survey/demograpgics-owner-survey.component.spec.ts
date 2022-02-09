import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsOwnerSurveyComponent } from './demograpgics-owner-survey.component';

describe('DemograpgicsOwnerSurveyComponent', () => {
  let component: DemograpgicsOwnerSurveyComponent;
  let fixture: ComponentFixture<DemograpgicsOwnerSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsOwnerSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsOwnerSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
