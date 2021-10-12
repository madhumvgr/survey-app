import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStartComponent } from './survey-start.component';

describe('SurveyStartComponent', () => {
  let component: SurveyStartComponent;
  let fixture: ComponentFixture<SurveyStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
