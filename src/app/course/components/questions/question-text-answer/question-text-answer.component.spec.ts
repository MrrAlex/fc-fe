import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTextAnswerComponent } from './question-text-answer.component';

describe('QuestionTextAnswerComponent', () => {
  let component: QuestionTextAnswerComponent;
  let fixture: ComponentFixture<QuestionTextAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTextAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTextAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
