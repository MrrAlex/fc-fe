import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRangeAnswerComponent } from './question-range-answer.component';

describe('QuestionRangeAnswerComponent', () => {
  let component: QuestionRangeAnswerComponent;
  let fixture: ComponentFixture<QuestionRangeAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionRangeAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionRangeAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
