import { createAction, props } from '@ngrx/store';
import { Lesson } from '../models/lesson.model';
import { Question } from '../models/question.model';

export const loadLesson = createAction(
  '[Lesson] Load Lesson',
  props<{ id: string }>()
);
export const loadLessonSuccess = createAction(
  '[Lesson] Load Lesson Success',
  props<{ lesson: Lesson }>()
);
export const loadLessonFailed = createAction('[Lesson] Load Lesson Failed');

export const addQuestionToLesson = createAction(
  '[Lesson] Add Question To Lesson',
  props<{ id: string; question: Question }>()
);

export const updateQuestionToLesson = createAction(
  '[Lesson] Update Question To Lesson',
  props<{ id: string; question: Question }>()
);

export const updateLesson = createAction(
  '[Lesson] Update Lesson',
  props<{ lesson: Lesson }>()
);
export const updateLessonSuccess = createAction(
  '[Lesson] Update Lesson Success',
  props<{ lesson: Lesson }>()
);
export const updateLessonFailed = createAction('[Lesson] Update Lesson Failed');

export const assignQuestion = createAction(
  '[Lesson] Assign Question to Lesson',
  props<{ id: string; questions: Question[] }>()
);
export const assignQuestionSuccess = createAction(
  '[Lesson] Assign Question to Lesson Success',
  props<{ lesson: Lesson }>()
);
export const assignQuestionFailed = createAction(
  '[Lesson] [Lesson] Assign Question to Lesson Failed'
);

export const clearErrorMessage = createAction(
  '[Course] Clear Error Message'
);

export const clearSuccessMessage = createAction(
  '[Course] Clear Success Message'
);
