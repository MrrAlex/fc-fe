import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './lesson.reducer';

export const getLessonState = createFeatureSelector<LessonState>('lessons');

export const selectLessonLoading = createSelector(
  getLessonState,
  (state) => state?.loading
);
export const selectLessonState = createSelector(
  getLessonState,
  (state) => state?.success
);

export const selectLessonErrorMessage = createSelector(
  getLessonState,
  (state) => state?.errorMessage
);

export const selectLessonSuccessMessage = createSelector(
  getLessonState,
  (state) => state?.successMessage
);

export const selectEntities = createSelector(
  getLessonState,
  (state) => state?.entities
);

export const selectById = (id: string) =>
  createSelector(selectEntities, (entities) => entities && entities[id]);
