import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRulesDialogComponent } from './quiz-rules-dialog.component';

describe('QuizRulesDialogComponent', () => {
  let component: QuizRulesDialogComponent;
  let fixture: ComponentFixture<QuizRulesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRulesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
