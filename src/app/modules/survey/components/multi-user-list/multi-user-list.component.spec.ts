import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUserListComponent } from './multi-user-list.component';

describe('MultiUserListComponent', () => {
  let component: MultiUserListComponent;
  let fixture: ComponentFixture<MultiUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
