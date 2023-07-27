import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { StudyModule } from '../models/study-module.model';

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
  '[Course] Create Course Success',
  props<{ course: Course }>()
);
export const createCourseFailed = createAction('[Course] Create Course Failed');

export const updateCourse = createAction(
  '[Course] Update Course',
  props<{ course: Course; id: string }>()
);
export const updateCourseSuccess = createAction(
  '[Course] Update Course Success',
  props<{ course: Course }>()
);
export const updateCourseFailed = createAction('[Course] Update Course Failed');

export const createModule = createAction(
  '[Course] Create Module for Course',
  props<{ module: StudyModule; courseId: string }>()
);
export const createModuleSuccess = createAction(
  '[Course] Create Module for Course Success',
  props<{ course: Course }>()
);
export const createModuleFailed = createAction(
  '[Course] Create Module for Course Failed'
);

export const updateModule = createAction(
  '[Course] Update Module',
  props<{ module: StudyModule; courseId: string }>()
);
export const updateModuleSuccess = createAction(
  '[Course] Update Module for Course Success',
  props<{ module: StudyModule; courseId: string }>()
);
export const updateModuleFailed = createAction(
  '[Course] Update Module for Course Failed'
);

export const createLesson = createAction(
  '[Course] Create Lesson',
  props<{ lesson: Lesson; moduleId: string; courseId: string }>()
);
export const createLessonSuccess = createAction(
  '[Course] Create Lesson Success',
  props<{ module: StudyModule; moduleId: string; courseId: string }>()
);
export const createLessonFailed = createAction('[Course] Create Lesson Failed');

export const updateLesson = createAction(
  '[Course] Update Lesson',
  props<{ lesson: Lesson; courseId: string; moduleId: string }>()
);
export const updateLessonSuccess = createAction(
  '[Course] Update Lesson Success',
  props<{ lesson: Lesson; courseId: string; moduleId: string }>()
);
export const updateLessonFailed = createAction('[Course] Update Lesson Failed');

export const removeLesson = createAction(
  '[Course] Remove Lesson',
  props<{ lesson: Lesson }>()
);
export const removeLessonSuccess = createAction(
  '[Course] Remove Lesson Success',
  props<{ lesson: Lesson }>()
);
export const removeLessonFailed = createAction('[Course] Remove Lesson Failed');

export const clearErrorMessage = createAction(
  '[Course] Clear Error Message'
);

export const clearSuccessMessage = createAction(
  '[Course] Clear Success Message'
);
