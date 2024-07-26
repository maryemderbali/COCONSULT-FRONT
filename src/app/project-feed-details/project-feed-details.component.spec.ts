import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeedDetailsComponent } from './project-feed-details.component';

describe('ProjectFeedDetailsComponent', () => {
  let component: ProjectFeedDetailsComponent;
  let fixture: ComponentFixture<ProjectFeedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFeedDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
