import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemeetComponent } from './homemeet.component';

describe('HomemeetComponent', () => {
  let component: HomemeetComponent;
  let fixture: ComponentFixture<HomemeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomemeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomemeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
