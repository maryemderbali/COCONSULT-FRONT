import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketlistComponent } from './addticketlist.component';

describe('AddticketlistComponent', () => {
  let component: AddTicketlistComponent;
  let fixture: ComponentFixture<AddTicketlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTicketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
