import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesUsersMeetComponent } from './listes-users-meet.component';

describe('ListesUsersMeetComponent', () => {
  let component: ListesUsersMeetComponent;
  let fixture: ComponentFixture<ListesUsersMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesUsersMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesUsersMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
