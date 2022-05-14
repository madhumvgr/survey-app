import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixSubLevelComponent } from './matrix-sub-level.component';

describe('MatrixSubLevelComponent', () => {
  let component: MatrixSubLevelComponent;
  let fixture: ComponentFixture<MatrixSubLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixSubLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSubLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
