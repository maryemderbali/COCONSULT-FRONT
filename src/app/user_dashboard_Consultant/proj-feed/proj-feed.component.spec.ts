import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjFeedComponent } from './proj-feed.component';

describe('ProjFeedComponent', () => {
  let component: ProjFeedComponent;
  let fixture: ComponentFixture<ProjFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
