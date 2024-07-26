import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAffectuserComponent } from './meeting-affectuser.component';

describe('MeetingAffectuserComponent', () => {
  let component: MeetingAffectuserComponent;
  let fixture: ComponentFixture<MeetingAffectuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingAffectuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingAffectuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
