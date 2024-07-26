import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpportComponent } from './job-opport.component';

describe('JobOpportComponent', () => {
  let component: JobOpportComponent;
  let fixture: ComponentFixture<JobOpportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOpportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOpportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
