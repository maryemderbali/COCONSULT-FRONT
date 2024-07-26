import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsProjComponent } from './charts-proj.component';

describe('ChartsProjComponent', () => {
  let component: ChartsProjComponent;
  let fixture: ComponentFixture<ChartsProjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsProjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
