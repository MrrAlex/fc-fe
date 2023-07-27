import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesAdapter, CourseState } from './course.reducer';

export const getCourseState = createFeatureSelector<CourseState>('courses');

export const selectCourseLoading = createSelector(
  getCourseState,
  (state) => state?.loading
);

export const selectErrorMessage = createSelector(
  getCourseState,
  (state) => state?.error
);
export const selectSuccessMessage = createSelector(
  getCourseState,
  (state) => state?.successMessage
);

export const selectEntities = createSelector(
  getCourseState,
  (state) => state?.entities
);

const { selectAll } = coursesAdapter.getSelectors();

export const selectCourses = createSelector(getCourseState, selectAll);

export const selectById = (id: string) =>
  createSelector(selectEntities, (entities) => entities && entities[id]);
