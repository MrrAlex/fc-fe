import { createFeatureSelector, createSelector } from '@ngrx/store';
import { answersAdapter, AnswerState } from './answers.reducer';

export const getAnswersState = createFeatureSelector<AnswerState>('answers');

export const selectAnswersLoading = createSelector(
  getAnswersState,
  (state) => state?.loading
);

export const { selectAll } = answersAdapter.getSelectors(getAnswersState);

export const selectAnswersByLessonId = (lessonId: string) =>
  createSelector(
    selectAll,
    (entities) =>
      entities && entities.filter((item) => item.lessonId === lessonId)
  );
