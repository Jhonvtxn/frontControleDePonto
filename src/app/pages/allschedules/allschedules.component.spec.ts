import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllschedulesComponent } from './allschedules.component';

describe('AllschedulesComponent', () => {
  let component: AllschedulesComponent;
  let fixture: ComponentFixture<AllschedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllschedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllschedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
