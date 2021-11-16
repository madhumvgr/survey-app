import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvChannelsComponent } from './tv-channels.component';

describe('TvChannelsComponent', () => {
  let component: TvChannelsComponent;
  let fixture: ComponentFixture<TvChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
