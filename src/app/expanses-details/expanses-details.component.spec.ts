import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansesDetailsComponent } from './expanses-details.component';

describe('ExpansesDetailsComponent', () => {
  let component: ExpansesDetailsComponent;
  let fixture: ComponentFixture<ExpansesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
