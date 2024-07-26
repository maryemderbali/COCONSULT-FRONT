import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateActivitySalesTeamComponent } from './add-update-activity-sales-team.component';

describe('AddUpdateActivitySalesTeamComponent', () => {
  let component: AddUpdateActivitySalesTeamComponent;
  let fixture: ComponentFixture<AddUpdateActivitySalesTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateActivitySalesTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateActivitySalesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
