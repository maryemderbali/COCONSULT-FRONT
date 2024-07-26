import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityuseComponent } from './activityuse.component';

describe('ActivityuseComponent', () => {
  let component: ActivityuseComponent;
  let fixture: ComponentFixture<ActivityuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
