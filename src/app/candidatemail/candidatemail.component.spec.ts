import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatemailComponent } from './candidatemail.component';

describe('CandidatemailComponent', () => {
  let component: CandidatemailComponent;
  let fixture: ComponentFixture<CandidatemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatemailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
