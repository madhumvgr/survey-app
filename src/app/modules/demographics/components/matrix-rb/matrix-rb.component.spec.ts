import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixRbComponent } from './matrix-rb.component';

describe('MatrixRbComponent', () => {
  let component: MatrixRbComponent;
  let fixture: ComponentFixture<MatrixRbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixRbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixRbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
