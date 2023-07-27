import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultipleAnswersComponent } from './question-multiple-answers.component';

describe('QuestionCheckboxAnswerComponent', () => {
  let component: QuestionMultipleAnswersComponent;
  let fixture: ComponentFixture<QuestionMultipleAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMultipleAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionMultipleAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
