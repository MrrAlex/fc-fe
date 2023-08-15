import { createAction, props } from '@ngrx/store';
import { Answer } from '../models/answer.model';

export const saveAnswers = createAction(
  '[Answers] Save Answers',
  props<{ answers: Answer[]; user: string }>()
);
export const saveAnswersSuccess = createAction(
  '[Answers] Save Answers Success',
  props<{ answers: Answer[] }>()
);
export const saveAnswersFailed = createAction('[Answers] Save Answers Failed');

export const loadAnswers = createAction(
  '[Answers] Load Answers',
  props<{ lessonId: string; user: string }>()
);
export const loadAnswersSuccess = createAction(
  '[Answers] Load Answers Success',
  props<{ answers: Answer[] }>()
);
export const loadAnswersFailed = createAction('[Answers] Load Answers Failed');

export const loadCoursePdf = createAction(
  '[Answers] Load Pdf for Whole Course',
  props<{ user: string }>()
);
export const loadModulePdf = createAction(
  '[Answers] Load Pdf for Module',
  props<{ moduleId: string; user: string }>()
);
export const loadPdfSuccess = createAction(
  '[Answers] Load Pdf Success',
  props<{ pdf: Blob }>()
);
export const loadPdfFailed = createAction(
  '[Answers] [Answers] Load Pdf Failed'
);

