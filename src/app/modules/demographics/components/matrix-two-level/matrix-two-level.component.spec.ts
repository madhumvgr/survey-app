import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTwoLevelComponent } from './matrix-two-level.component';

describe('MatrixTwoLevelComponent', () => {
  let component: MatrixTwoLevelComponent;
  let fixture: ComponentFixture<MatrixTwoLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixTwoLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixTwoLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
