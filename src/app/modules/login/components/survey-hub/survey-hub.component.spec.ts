import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHubComponent } from './survey-hub.component';

describe('SurveyHubComponent', () => {
  let component: SurveyHubComponent;
  let fixture: ComponentFixture<SurveyHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
