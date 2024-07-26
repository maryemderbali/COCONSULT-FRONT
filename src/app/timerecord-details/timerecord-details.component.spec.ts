import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerecordDetailsComponent } from './timerecord-details.component';

describe('TimerecordDetailsComponent', () => {
  let component: TimerecordDetailsComponent;
  let fixture: ComponentFixture<TimerecordDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerecordDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
