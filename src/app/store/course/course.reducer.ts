import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from '../models/course.model';
import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.actions';
import { cloneDeep } from 'lodash';
import * as LessonActions from '../lesson/lesson.actions';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  success?: boolean;
}

export const coursesAdapter = createEntityAdapter<Course>({
  selectId: (course: Course) => course._id,
});

export const initialCourseState: CourseState = coursesAdapter.getInitialState({
  loading: false,
  error: null,
  successMessage: null,
  success: undefined,
});

const successMessage = (successMessage: string | null) => ({
  loading: false,
  success: true,
  error: null,
  successMessage,
});

const errorMessage = (error: string) => ({
  loading: false,
  success: false,
  successMessage: null,
  error,
});

export const coursesReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, (state) => ({ ...state, loading: true })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) =>
    coursesAdapter.setMany(courses, { ...state, ...successMessage(null) })
  ),
  on(CourseActions.loadCoursesFailed, (state) => {
    return coursesAdapter.removeAll({
      ...state,
      ...errorMessage('Error during course list loading'),
    });
  }),
  on(CourseActions.loadCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.loadCourseSuccess, (state, { course }) =>
    coursesAdapter.setOne(course, { ...state, ...successMessage(null) })
  ),
  on(CourseActions.loadCourseFailed, (state) => ({
    ...state,
    ...errorMessage('Error during course loading'),
  })),
  on(CourseActions.createCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.createCourseSuccess, (state, { course }) =>
    coursesAdapter.setOne(course, {
      ...state,
      ...successMessage('Course successfully created'),
    })
  ),
  on(CourseActions.createCourseFailed, (state) => ({
    ...state,
    ...errorMessage('Error during course creation'),
  })),
  on(CourseActions.updateCourse, (state) => ({ ...state, loading: true })),
  on(CourseActions.updateCourseSuccess, (state, { course }) =>
    coursesAdapter.setOne(course, {
      ...state,
      ...successMessage('Course successfully updated'),
    })
  ),
  on(CourseActions.updateCourseFailed, (state) => ({
    ...state,
    ...errorMessage('Error during course update'),
  })),
  on(CourseActions.createModule, (state) => ({ ...state, loading: true })),
  on(CourseActions.createModuleSuccess, (state, { course }) =>
    coursesAdapter.setOne(course, {
      ...state,
      ...successMessage('Module successfully created'),
    })
  ),
  on(CourseActions.createModuleFailed, (state) => ({
    ...state,
    ...errorMessage('Error during module creation'),
  })),
  on(CourseActions.createLesson, (state) => ({ ...state, loading: true })),
  on(
    CourseActions.createLessonSuccess,
    (state, { module, moduleId, courseId }) => {
      const course = state?.entities[courseId] as Course;
      const moduleIndex = course.modules.findIndex(
        (module) => module._id === moduleId
      );
      const newCourse = {
        ...course,
        modules: Object.assign([], course.modules, {
          [moduleIndex]: module,
        }),
      };
      return coursesAdapter.setOne(newCourse, {
        ...state,
        ...successMessage('Lesson successfully created'),
      });
    }
  ),
  on(CourseActions.createLessonFailed, (state) => ({
    ...state,
    ...errorMessage('Error during lesson creation'),
  })),
  on(CourseActions.updateLesson, (state) => ({ ...state, loading: true })),
  on(
    CourseActions.updateLessonSuccess,
    (state, { lesson, moduleId, courseId }) => {
      const course = state?.entities[courseId] as Course;
      const changedModuleIndex = course.modules.findIndex(
        (module) => module._id === moduleId
      );
      const lessonIndex = course.modules[changedModuleIndex].lessons.findIndex(
        (lessonItem) => lessonItem._id === lesson._id
      );
      const changeModuleLessons = Object.assign(
        [],
        course.modules[changedModuleIndex].lessons,
        {
          [lessonIndex]: lesson,
        }
      );
      const changedModule = {
        ...course.modules[changedModuleIndex],
        lessons: changeModuleLessons,
      };
      const changedModules = Object.assign([], course.modules, {
        [changedModuleIndex]: changedModule,
      });
      const newCourse = {
        ...course,
        modules: changedModules,
      };
      return coursesAdapter.setOne(newCourse, {
        ...state,
        ...successMessage('Lesson successfully updated'),
      });
    }
  ),
  on(CourseActions.updateLessonFailed, (state) => ({
    ...state,
    loading: false,
    success: false,
  })),
  on(CourseActions.updateModule, (state) => ({ ...state, loading: true })),
  on(CourseActions.updateModuleSuccess, (state, { module, courseId }) => {
    const course = cloneDeep(state?.entities[courseId] as Course);
    const moduleIndex = course.modules.findIndex(
      (moduleItem) => module._id === moduleItem._id
    );
    course.modules[moduleIndex] = module;
    return coursesAdapter.setOne(course, {
      ...state,
      ...errorMessage('Error during lesson update'),
    });
  }),
  on(CourseActions.clearErrorMessage, (state) => ({
    ...state,
    error: null,
  })),
  on(CourseActions.clearSuccessMessage, (state) => ({
    ...state,
    successMessage: null,
  }))
);
