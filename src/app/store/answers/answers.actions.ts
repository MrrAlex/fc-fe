import { createAction, props } from '@ngrx/store';
import { Answer } from '../models/answer.model';

export const saveAnswers = createAction(
  '[Answers] Save Answers',
  props<{ answers: Answer[]; user: string }>()
);
export const saveAnswersSuccess = createAction(
  '[Course] Save Answers Success',
  props<{ answers: Answer[] }>()
);
export const saveAnswersFailed = createAction('[Course] Save Answers Failed');

export const loadAnswers = createAction(
  '[Answers] Load Answers',
  props<{ lessonId: string; user: string }>()
);
export const loadAnswersSuccess = createAction(
  '[Course] Load Answers Success',
  props<{ answers: Answer[] }>()
);
export const loadAnswersFailed = createAction('[Course] Load Answers Failed');
