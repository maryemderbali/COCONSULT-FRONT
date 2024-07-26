import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatresultComponent } from './candidatresult.component';

describe('CandidatresultComponent', () => {
  let component: CandidatresultComponent;
  let fixture: ComponentFixture<CandidatresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatresultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
