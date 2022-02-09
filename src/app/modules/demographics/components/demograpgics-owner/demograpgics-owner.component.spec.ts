import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemograpgicsOwnerComponent } from './demograpgics-owner.component';

describe('DemograpgicsOwnerComponent', () => {
  let component: DemograpgicsOwnerComponent;
  let fixture: ComponentFixture<DemograpgicsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemograpgicsOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograpgicsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
