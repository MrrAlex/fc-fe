import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CourseActions from './course.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { CourseService } from '../services/course.service';

@Injectable()
export class MoviesEffects {
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
          map(() => CourseActions.createCourseSuccess()),
          catchError(() => of(CourseActions.createCourseFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}
}
