import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetinfRoomComponent } from './meetinf-room.component';

describe('MeetinfRoomComponent', () => {
  let component: MeetinfRoomComponent;
  let fixture: ComponentFixture<MeetinfRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetinfRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetinfRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
