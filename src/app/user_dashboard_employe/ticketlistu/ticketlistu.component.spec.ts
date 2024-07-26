import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketlistuComponent } from './ticketlistu.component';

describe('TicketlistuComponent', () => {
  let component: TicketlistuComponent;
  let fixture: ComponentFixture<TicketlistuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketlistuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketlistuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
