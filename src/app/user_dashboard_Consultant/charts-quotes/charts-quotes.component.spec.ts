import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsQuotesComponent } from './charts-quotes.component';

describe('ChartsQuotesComponent', () => {
  let component: ChartsQuotesComponent;
  let fixture: ComponentFixture<ChartsQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsQuotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
