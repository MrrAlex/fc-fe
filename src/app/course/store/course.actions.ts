import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course.model';

export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailed = createAction('[Course] Load Courses Failed');

export const loadCourse = createAction(
  '[Course] Load Course',
  props<{ id: string }>()
);
export const loadCourseSuccess = createAction(
  '[Course] Load Course Success',
  props<{ course: Course }>()
);
export const loadCourseFailed = createAction('[Course] Load Course Failed');

export const createCourse = createAction(
  '[Course] Create Course',
  props<{ course: Course }>()
);
export const createCourseSuccess = createAction(
  '[Course] Create Course Success'
);
export const createCourseFailed = createAction('[Course] Create Course Failed');

export const updateCourse = createAction('[Course] Update Course');
export const updateCourseSuccess = createAction(
  '[Course] Update Course Success'
);
export const updateCourseFailed = createAction('[Course] Update Course Failed');
