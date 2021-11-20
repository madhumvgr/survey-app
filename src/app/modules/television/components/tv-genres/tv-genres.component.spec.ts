import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvGenresComponent } from './tv-genres.component';

describe('TvGenresComponent', () => {
  let component: TvGenresComponent;
  let fixture: ComponentFixture<TvGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
