import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from '../models/course.model';
import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.actions';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  success?: boolean;
}

export const coursesAdapter = createEntityAdapter<Course>({
  selectId: (course: Course) => course.id,
});

export const initialState: CourseState = coursesAdapter.getInitialState({
  loading: false,
  success: undefined,
});

export const coursesReducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, (state) => ({ ...state, loading: true })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) =>
    coursesAdapter.setMany(courses, { ...state, loading: false, success: true })
  ),
  on(CourseActions.loadCoursesFailed, (state) =>
    coursesAdapter.removeAll({ ...state, loading: false, success: false })
  ),
  on(CourseActions.loadCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.loadCourseSuccess, (state) => ({ ...state, loading: false })),
  on(CourseActions.loadCourseFailed, (state) => ({ ...state, loading: false }))
);
