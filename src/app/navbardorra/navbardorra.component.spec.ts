import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbardorraComponent } from './navbardorra.component';

describe('NavbardorraComponent', () => {
  let component: NavbardorraComponent;
  let fixture: ComponentFixture<NavbardorraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbardorraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbardorraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
