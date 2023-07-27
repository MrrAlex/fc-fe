import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LessonActions from './lesson.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { LessonService } from '../services/lesson.service';

@Injectable()
export class LessonEffects {
  loadLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonActions.loadLesson),
      switchMap(({ id }) =>
        this.lessonService.loadLesson(id).pipe(
          map((updated) =>
            LessonActions.loadLessonSuccess({ lesson: updated })
          ),
          catchError(() => of(LessonActions.loadLessonFailed()))
        )
      )
    )
  );

  saveQuestionsForLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonActions.assignQuestion),
      switchMap(({ id, questions }) =>
        this.lessonService.saveQuestionsForLesson(id, questions).pipe(
          map((updated) =>
            LessonActions.assignQuestionSuccess({ lesson: updated })
          ),
          catchError(() => of(LessonActions.assignQuestionFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private lessonService: LessonService
  ) {}
}
