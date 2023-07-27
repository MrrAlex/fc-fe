import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CourseActions from './course.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from '../services/course.service';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses.type),
      switchMap(() =>
        this.courseService.loadCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError(() => of(CourseActions.loadCoursesFailed()))
        )
      )
    )
  );

  loadCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourse),
      switchMap(({ id }) =>
        this.courseService.loadCourse(id).pipe(
          map((course) => CourseActions.loadCourseSuccess({ course })),
          catchError(() => of(CourseActions.loadCourseFailed()))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createCourse),
      switchMap(({ course }) =>
        this.courseService.createCourse(course).pipe(
          map((course) => CourseActions.createCourseSuccess({course})),
          catchError(() => of(CourseActions.createCourseFailed()))
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      switchMap(({ id, course }) =>
        this.courseService.updateCourse(id, course).pipe(
          map((updated) =>
            CourseActions.updateCourseSuccess({ course: updated })
          ),
          catchError(() => of(CourseActions.updateCourseFailed()))
        )
      )
    )
  );

  addNewModule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createModule),
      switchMap(({ module, courseId }) =>
        this.courseService.createModule(courseId, module).pipe(
          map((updated) =>
            CourseActions.createModuleSuccess({ course: updated })
          ),
          catchError(() => of(CourseActions.createModuleFailed()))
        )
      )
    )
  );

  addNewLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createLesson),
      switchMap(({ lesson, moduleId, courseId }) =>
        this.courseService.createLesson(moduleId, lesson).pipe(
          map((updated) =>
            CourseActions.createLessonSuccess({
              module: updated,
              moduleId,
              courseId,
            })
          ),
          catchError(() => of(CourseActions.createLessonFailed()))
        )
      )
    )
  );

  updateLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateLesson),
      switchMap(({ lesson, moduleId, courseId }) =>
        this.courseService.updateLesson(lesson._id, lesson).pipe(
          map((updated) =>
            CourseActions.updateLessonSuccess({
              lesson: updated,
              moduleId,
              courseId,
            })
          ),
          catchError(() => of(CourseActions.updateLessonFailed()))
        )
      )
    )
  );

  updateModule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateModule),
      switchMap(({ module, courseId }) =>
        this.courseService.updateModule(module._id, module).pipe(
          map((updated) =>
            CourseActions.updateModuleSuccess({ module: updated, courseId })
          ),
          catchError(() => of(CourseActions.updateModuleFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}
}
