import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesAdapter, CourseState } from './course.reducer';

export const getCourseState = createFeatureSelector<CourseState>('courses');

export const selectCourseLoading = createSelector(
  getCourseState,
  (state) => state?.loading
);
export const selectCourseStatus = createSelector(
  getCourseState,
  (state) => state?.success
);

const { selectEntities, selectAll } = coursesAdapter.getSelectors();

export const selectCourses = createSelector(getCourseState, selectAll);

export const selectById = (id: string) =>
  createSelector(selectEntities, (entities) => entities[id]);
