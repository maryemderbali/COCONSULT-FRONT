import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatejobdComponent } from './updatejobd.component';

describe('UpdatejobdComponent', () => {
  let component: UpdatejobdComponent;
  let fixture: ComponentFixture<UpdatejobdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatejobdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatejobdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
